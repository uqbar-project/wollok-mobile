import React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import {
	Button,
	Modal,
	Portal,
	Text,
	Title,
	withTheme,
} from 'react-native-paper'
import { theme, Theme } from '../../../theme'
import { wTranslate } from '../../../utils/translation-helpers'
import { ParentComponentProp, Visible } from '../../../utils/type-helpers'
import { stylesheet } from './styles'

export type FormModalProps = ParentComponentProp<
	Visible & {
		onSubmit: () => void
		resetForm?: () => void
		title?: string
		valid?: boolean
		theme: Theme
	}
>

function FormModal(props: FormModalProps) {
	const styles = stylesheet(props.theme)

	const disabledSubmit = props.valid === undefined ? false : !props.valid

	const okStyle: StyleProp<TextStyle> = {
		color: disabledSubmit ? 'grey' : theme.colors.text,
	}

	function closeModal() {
		props.resetForm?.call(this)
		props.setVisible(false)
	}
	return (
		<Portal>
			<Modal
				contentContainerStyle={styles.modal}
				visible={props.visible}
				onDismiss={closeModal}>
				{props.title ? <Title style={styles.title}>{props.title}</Title> : null}
				{props.children}
				<Button
					disabled={disabledSubmit}
					onPress={() => {
						props.onSubmit()
						closeModal()
					}}>
					<Text style={okStyle}>{wTranslate('ok').toUpperCase()}</Text>
				</Button>
			</Modal>
		</Portal>
	)
}

export default withTheme(FormModal)
