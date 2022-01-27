import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Describe } from 'wollok-ts/dist/model'
import { wTranslate } from '../../utils/translation-helpers'
import FormModal from '../ui/FormModal/FormModal'

const initialName: string = ''

function NewDescribeModal(props: {
	visible: boolean
	setVisible: (value: boolean) => void
	addDescribe: (test: Describe) => void
}) {
	const [name, setName] = useState<string>(initialName)

	return (
		<FormModal
			onSubmit={addDescribe}
			resetForm={resetForm}
			setVisible={props.setVisible}
			visible={props.visible}>
			<TextInput
				onChangeText={setName}
				placeholder={wTranslate('describe.name')}
			/>
		</FormModal>
	)

	function addDescribe() {
		props.addDescribe(new Describe({ name }))
	}

	function resetForm() {
		setName(initialName)
	}
}

export default NewDescribeModal
