import React from 'react'
import { StyleSheet } from 'react-native'
import { Dialog, Divider, List, Portal } from 'react-native-paper'
import { Theme, useTheme } from '../../theme'

type OptionsDialogProps<Optionable> = {
	options: { title: string; action: () => void }[]
	visible: boolean
	dismiss: () => void
	title: string
}

export function OptionsDialog<Optionable>({
	options,
	visible,
	dismiss,
	title,
}: OptionsDialogProps<Optionable>) {
	const styles = makeStyles(useTheme())

	return (
		<Portal>
			<Dialog style={styles.dialog} visible={visible} onDismiss={dismiss}>
				<Dialog.Title>{title}</Dialog.Title>
				{options.map((o, i) => (
					<>
						{i > 0 && <Divider />}
						<List.Item
							key={i}
							style={styles.item}
							title={o.title}
							titleStyle={styles.itemTitle}
							onPress={() => o.action()}
						/>
					</>
				))}
			</Dialog>
		</Portal>
	)
}

const makeStyles = (theme: Theme) => {
	return StyleSheet.create({
		dialog: { backgroundColor: theme.colors.card },
		item: {},
		itemTitle: { textAlign: 'center' },
	})
}
