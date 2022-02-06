import { Theme, useTheme } from '@react-navigation/native'
import React, { Key, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, List as ListComponent } from 'react-native-paper'
import { List } from 'wollok-ts/dist/model'

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
	const [expanded, setExpanded] = useState<boolean>(
		props.initialExpanded || false,
	)

	return (
		<ListComponent.Accordion
			title={`${props.title} (${props.items.length})`}
			expanded={expanded}
			onPress={() => switchExpanded()}>
			{props.items.map(item => {
				return (
					<View key={`${item.name}${item.parameters?.length}`}>
						<props.VisualItem item={item} />
						<Divider style={styles.divider} />
					</View>
				)
			})}
		</ListComponent.Accordion>
	)

	function switchExpanded() {
		setExpanded(!expanded)
	}
}

function getStyles(theme: Theme) {
	return StyleSheet.create({
		divider: {
			marginHorizontal: 10,
			backgroundColor: theme.colors.card,
		},
	})
}
