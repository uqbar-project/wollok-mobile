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
import { translate } from '../../../utils/translation-helpers'
import { OneOrMany } from '../../../utils/type-helpers'
import { stylesheet } from './styles'

function FormModal(props: {
	visible: boolean
	setVisible: (value: boolean) => void
	children: OneOrMany<Element>
	onSubmit: () => void
	resetForm?: () => void
	title?: string
	theme: Theme
}) {
	const styles = stylesheet(props.theme)

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
					onPress={() => {
						props.onSubmit()
						closeModal()
					}}>
					<Text>{translate('ok').toUpperCase()}</Text>
				</Button>
			</Modal>
		</Portal>
	)
}

export default withTheme(FormModal)
