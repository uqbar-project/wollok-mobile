import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, TextInput, withTheme } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Body, Method, Parameter } from 'wollok-ts/dist/model'
import { useEntity } from '../../../context/EntityProvider'
import { Theme } from '../../../theme'
import { wTranslate } from '../../../utils/translation-helpers'
import FormModal from '../../ui/FormModal/FormModal'
import ParameterInput from './ParameterInput'

const NewMethodModal = (props: {
	visible: boolean
	setVisible: (value: boolean) => void
	theme: Theme
}) => {
	const {
		actions: { addMember },
	} = useEntity()
	const [name, setName] = useState('')
	const [parameters, setParameters] = useState<string[]>([])
	const [nextParameter, setNextParameter] = useState('')

	return (
		<FormModal
			title={wTranslate('entityDetails.methodModal.newMethod')}
			resetForm={reset}
			onSubmit={newMethod}
			setVisible={props.setVisible}
			visible={props.visible}>
			<TextInput
				onChangeText={setName}
				label={wTranslate('entityDetails.methodModal.nameOfMethod')}
			/>

			<Text style={styles.subtitle}>
				{upperCaseFirst(wTranslate('entityDetails.methodModal.parameters'))}
			</Text>
			{parameters.map((param, i) => (
				<ParameterInput
					key={param}
					icon="trash-can-outline"
					parameter={param}
					setParameter={newParam => setParameter(newParam, i)}
					onPress={() => removeParameter(i)}
				/>
			))}

			<ParameterInput
				icon="plus"
				parameter={nextParameter}
				setParameter={setNextParameter}
				onPress={addNextParameter}
			/>
		</FormModal>
	)

	function reset() {
		setName('')
		setNextParameter('')
		setParameters([])
	}

	function newMethod() {
		addMember(
			new Method({
				name,
				parameters: parameters.map(
					paramName => new Parameter({ name: paramName }),
				),
				body: new Body({ sentences: [] }),
			}),
		)
	}

	function addNextParameter() {
		setParameters([...parameters, nextParameter])
		setNextParameter('')
	}

	function setParameter(newParameter: string, i: number) {
		parameters[i] = newParameter
		setParameters([...parameters])
	}

	function removeParameter(i: number) {
		parameters.splice(i, 1)
		setParameters([...parameters])
	}
}

const styles = StyleSheet.create({
	subtitle: { fontSize: 16, marginTop: 15 },
})

export default withTheme(NewMethodModal)
