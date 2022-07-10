import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Body, Method, Parameter } from 'wollok-ts/dist/model'
import { wTranslate } from '../../../utils/translation/translation-helpers'
import { Visible } from '../../../utils/type-helpers'
import FormModal from '../../ui/FormModal/FormModal'
import ParameterInput from './ParameterInput'

type NewMethodModalProps = Visible & {
	onSubmit: (m: Method) => void
	initialMethod?: Method
	title: string
}

const MethodFormModal = ({
	title,
	visible,
	setVisible,
	onSubmit,
	initialMethod,
}: NewMethodModalProps) => {
	const [name, setName] = useState(initialMethod?.name || '')
	const [parameters, setParameters] = useState<string[]>(
		initialMethod?.parameters.map(p => p.name) || [],
	)
	const [nextParameter, setNextParameter] = useState('')

	return (
		<FormModal
			title={title}
			resetForm={reset}
			onSubmit={newMethod}
			setVisible={setVisible}
			valid={name.length > 0}
			visible={visible}>
			<TextInput
				onChangeText={setName}
				value={name}
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
		if (!initialMethod) {
			setName('')
			setNextParameter('')
			setParameters([])
		}
	}

	function newMethod() {
		onSubmit(
			new Method({
				name,
				parameters: parameters.map(
					paramName => new Parameter({ name: paramName }),
				),
				body: initialMethod?.body || new Body({ sentences: [] }),
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

export default MethodFormModal
