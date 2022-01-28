import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Body, Test } from 'wollok-ts/dist/model'
import { useEntity } from '../../context/EntityProvider'
import { wTranslate } from '../../utils/translation-helpers'
import FormModal from '../ui/FormModal/FormModal'

const initialName: string = ''

function NewTestModal(props: {
	visible: boolean
	setVisible: (value: boolean) => void
}) {
	const {
		actions: { addMember },
	} = useEntity()
	const [name, setName] = useState<string>(initialName)

	return (
		<FormModal
			onSubmit={addDescribe}
			resetForm={resetForm}
			setVisible={props.setVisible}
			visible={props.visible}>
			<TextInput
				onChangeText={setName}
				placeholder={wTranslate('tests.newTestName')}
			/>
		</FormModal>
	)

	function addDescribe() {
		addMember(new Test({ name, body: new Body() }))
	}

	function resetForm() {
		setName(initialName)
	}
}

export default NewTestModal
