import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, TextInput, withTheme } from 'react-native-paper'
import { Method } from '../../../models/entity'
import { Theme } from '../../../theme'
import FormModal from '../../ui/FormModal/FormModal'
import ParameterInput from './ParameterInput'

const NewMethodModal = (props: {
	visible: boolean
	setVisible: (value: boolean) => void
	addMethod: (method: Method) => void
	theme: Theme
}) => {
	const [name, setName] = useState('')
	const [parameters, setParameters] = useState<string[]>([])
	const [nextParameter, setNextParameter] = useState('')

	return (
		<FormModal
			resetForm={reset}
			onSubmit={newMethod}
			setVisible={props.setVisible}
			visible={props.visible}>
			<TextInput onChangeText={setName} label={'Nombre del método'} />
			<Text style={styles.subtitle}>Parametros</Text>
			{parameters.map((param, i) => (
				<ParameterInput
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
		props.addMethod(new Method(name, parameters))
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
