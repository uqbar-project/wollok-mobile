import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Body, Method, Parameter } from 'wollok-ts/dist/model'
import { wTranslate } from '../../../utils/translation-helpers'
import { Visible } from '../../../utils/type-helpers'
import FormModal from '../../ui/FormModal/FormModal'
import ParameterInput from './ParameterInput'

type NewMethodModalProps = Visible & { addNewMethod: (m: Method) => void }

const NewMethodModal = ({
	visible,
	setVisible,
	addNewMethod,
}: NewMethodModalProps) => {
	const [name, setName] = useState('')
	const [parameters, setParameters] = useState<string[]>([])
	const [nextParameter, setNextParameter] = useState('')

	return (
		<FormModal
			title={wTranslate('entityDetails.methodModal.newMethod')}
			resetForm={reset}
			onSubmit={newMethod}
			setVisible={setVisible}
			visible={visible}>
			<TextInput
				onChangeText={setName}
				label={wTranslate('entityDetails.methodModal.nameOfMethod')}
			/>

			<Text style={styles.subtitle}>
				{upperCaseFirst(wTranslate('entityDetails.methodModal.parameters'))}
			</Text>
			<>
				{parameters.map((param, i) => (
					<ParameterInput
						key={param}
						icon="trash-can-outline"
						parameter={param}
						setParameter={newParam => setParameter(newParam, i)}
						onPress={() => removeParameter(i)}
					/>
				))}
			</>

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
		addNewMethod(
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

export default NewMethodModal
