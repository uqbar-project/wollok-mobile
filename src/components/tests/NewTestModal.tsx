import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Body, Test } from 'wollok-ts/dist/model'
import { wTranslate } from '../../utils/translation-helpers'
import FormModal from '../ui/FormModal/FormModal'

const initialName: string = ''

function NewTestModal(props: {
	visible: boolean
	setVisible: (value: boolean) => void
	addTest: (test: Test) => void
}) {
	const [name, setName] = useState<string>(initialName)

	return (
		<FormModal
			onSubmit={addTest}
			resetForm={resetForm}
			setVisible={props.setVisible}
			visible={props.visible}>
			<TextInput
				onChangeText={setName}
				placeholder={wTranslate('tests.name')}
			/>
		</FormModal>
	)

	function addTest() {
		props.addTest(new Test({ name, body: new Body() }))
	}

	function resetForm() {
		setName(initialName)
	}
}

export default NewTestModal
