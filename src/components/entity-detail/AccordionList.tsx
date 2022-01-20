import { Theme, useTheme } from '@react-navigation/native'
import React, { Key } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, List as ListComponent } from 'react-native-paper'
import { List } from 'wollok-ts/dist/model'

type Props<Item> = {
	title: string
	items: Item[]
	getVisualItem: (item: Item) => Element
}
export const AccordionList = function <
	Item extends { name: Key; parameters?: List<any> },
>(props: Props<Item>) {
	const reactNavigationTheme = useTheme()
	const styles = getStyles(reactNavigationTheme)

	return (
		<ListComponent.Accordion title={props.title}>
			{props.items.map(item => {
				return (
					<View key={`${item.name}${item.parameters?.length}`}>
						{props.getVisualItem(item)}
						<Divider style={styles.divider} />
					</View>
				)
			})}
		</ListComponent.Accordion>
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
