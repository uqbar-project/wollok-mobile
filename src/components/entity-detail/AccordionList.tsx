import { Theme, useTheme } from '@react-navigation/native'
import React, { Key } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { List } from 'wollok-ts/dist/extensions'
import { localCompareByProperty } from '../../utils/commons'
import Accordion from '../ui/Accordion'

type Props<Item> = {
	title: string
	items: Item[]
	VisualItem: React.FC<{ item: Item }>
	initialExpanded?: boolean
}
export const AccordionList = function <
	Item extends { name: Key; parameters?: List<any> },
>(props: Props<Item>) {
	const reactNavigationTheme = useTheme()
	const styles = getStyles(reactNavigationTheme)

	return (
		<Accordion
			title={`${props.title} (${props.items.length})`}
			initialExpanded={props.initialExpanded}>
			{props.items.sort(localCompareByProperty('name')).map(item => (
				<View key={`${item.name}${item.parameters?.length}`}>
					<props.VisualItem item={item} />
					<Divider style={styles.divider} />
				</View>
			))}
		</Accordion>
	)
}

// TODO: Use same style in all Dividers
function getStyles(theme: Theme) {
	return StyleSheet.create({
		divider: {
			marginHorizontal: 10,
			backgroundColor: theme.colors.card,
		},
	})
}
