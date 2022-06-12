import React from 'react'
import { StyleSheet } from 'react-native'
import { Dialog, Divider, List, Portal } from 'react-native-paper'
import { Theme, useTheme } from '../../../theme'
import { wTranslate } from '../../../utils/translation/translation-helpers'

export type Option = { title: string; action: () => void }

type OptionsDialogProps = {
	options: Option[]
	visible: boolean
	dismiss: () => void
	title: string
}

export function optionsTitleFromName(name: string) {
	return wTranslate('abm.options', { name })
}

export function OptionsDialog({
	options,
	visible,
	dismiss,
	title,
}: OptionsDialogProps) {
	const styles = makeStyles(useTheme())

	return (
		<Portal>
			<Dialog style={styles.dialog} visible={visible} onDismiss={dismiss}>
				<Dialog.Title>{title}</Dialog.Title>
				{options.map((o, i) => (
					<ListElement option={o} showDivider={i > 0} key={i} />
				))}
			</Dialog>
		</Portal>
	)
}

const ListElement = (props: {
	showDivider: boolean
	option: Option
}): JSX.Element => {
	const styles = makeStyles(useTheme())

	return (
		<>
			{props.showDivider && <Divider />}
			<List.Item
				style={styles.item}
				title={props.option.title}
				titleStyle={styles.itemTitle}
				onPress={() => props.option.action()}
			/>
		</>
	)
}

const makeStyles = (theme: Theme) => {
	return StyleSheet.create({
		dialog: { backgroundColor: theme.colors.card },
		item: {},
		itemTitle: { textAlign: 'center' },
	})
}
