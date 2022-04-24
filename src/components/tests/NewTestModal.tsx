import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Body, Test } from 'wollok-ts/dist/model'
import { wTranslate } from '../../utils/translation-helpers'
import FormModal, { FormModalProps } from '../ui/FormModal/FormModal'

const initialName: string = ''

type NewTestModalProps = Pick<FormModalProps, 'visible' | 'setVisible'> & {
	addNewTest: (t: Test) => void
}

function NewTestModal({ visible, setVisible, addNewTest }: NewTestModalProps) {
	const [name, setName] = useState<string>(initialName)

	return (
		<FormModal
			onSubmit={addDescribe}
			resetForm={resetForm}
			setVisible={setVisible}
			visible={visible}>
			<TextInput
				onChangeText={setName}
				placeholder={wTranslate('tests.newTestName')}
			/>
		</FormModal>
	)

	function addDescribe() {
		addNewTest(new Test({ name, body: new Body() }))
	}

	function resetForm() {
		setName(initialName)
	}
}

export default NewTestModal
