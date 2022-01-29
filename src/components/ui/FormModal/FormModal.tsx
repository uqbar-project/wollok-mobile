import React from 'react'
import {
	Button,
	Modal,
	Portal,
	Text,
	Title,
	withTheme,
} from 'react-native-paper'
import { Theme } from '../../../theme'
import { wTranslate } from '../../../utils/translation-helpers'
import { ParentComponentProp } from '../../../utils/type-helpers'
import { stylesheet } from './styles'

function FormModal(
	props: ParentComponentProp<{
		visible: boolean
		setVisible: (value: boolean) => void
		onSubmit: () => void
		resetForm?: () => void
		title?: string
		valid?: boolean
		theme: Theme
	}>,
) {
	const styles = stylesheet(props.theme)

	const disabledSubmit = props.valid === undefined ? false : !props.valid

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
					<Text>{wTranslate('ok').toUpperCase()}</Text>
				</Button>
			</Modal>
		</Portal>
	)
}

export default withTheme(FormModal)
