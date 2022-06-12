import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Visible } from '../../../utils/type-helpers'
import FormModal from './FormModal'

export function TextFormModal(
	props: Visible & {
		title: string
		onSubmit: (text: string) => void
		currentText?: string
	},
) {
	const [text, setText] = useState<string | null>(null)
	return (
		<FormModal
			valid={text !== null && text !== ''}
			title={props.title}
			visible={props.visible}
			setVisible={props.setVisible}
			onSubmit={() => props.onSubmit(text!)}
			resetForm={() => setText(null)}>
			<TextInput
				onChangeText={setText}
				value={text === null ? props.currentText : text}
			/>
		</FormModal>
	)
}
