import React from 'react'
import { StyleSheet } from 'react-native'
import { List } from 'react-native-paper'
import { Theme, useTheme } from '../../theme'

type NamedItem = {
	name?: string
}

type ListProps<T extends NamedItem> = typeof List.Item.defaultProps & {
	namedItem: T
}

export const NamedListItem = <T extends NamedItem>({
	namedItem,
	...rest
}: ListProps<T>) => {
	const { item, itemTitle } = stylesheet(useTheme())
	return (
		<List.Item
			{...rest}
			title={namedItem.name}
			style={item}
			titleStyle={itemTitle}
		/>
	)
}

function stylesheet(theme: Theme) {
	return StyleSheet.create({
		item: {
			marginHorizontal: 10,
			borderRadius: 5,
			padding: 10,
			marginTop: 10,
			borderWidth: 1,

			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 1,
			},
			shadowOpacity: 0.22,
			shadowRadius: 2.22,

			elevation: 3,
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.notification,
		},
		itemTitle: {
			fontSize: 20,
		},
	})
}
