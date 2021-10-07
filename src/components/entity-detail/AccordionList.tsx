import { Theme, useTheme } from '@react-navigation/native'
import React, { Key } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, List } from 'react-native-paper'

type Props<Item> = {
	title: string
	items: Item[]
	getVisualItem: (item: Item) => Element
}
export const AccordionList = function <Item extends { key: Key }>(
	props: Props<Item>,
) {
	const reactNavigationTheme = useTheme()
	const styles = getStyles(reactNavigationTheme)

	return (
		<List.Accordion title={props.title}>
			{props.items.map(item => {
				return (
					<View key={item.key}>
						{props.getVisualItem(item)}
						<Divider style={styles.divider} />
					</View>
				)
			})}
		</List.Accordion>
	)
}

function getStyles(theme: Theme) {
	return StyleSheet.create({
		divider: {
			marginHorizontal: 10,
			backgroundColor: theme.colors.card,
		},
	})
}
