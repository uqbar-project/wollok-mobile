import React from 'react'
import { StyleSheet } from 'react-native'
import { List, withTheme } from 'react-native-paper'
import { Attribute } from '../../models/attribute'
import { Theme } from '../../theme'

function AttributeItem(props: { attribute: Attribute; theme: Theme }) {
	const {
		attribute: { property, constant, description },
		theme,
	} = props

	const icons = [
		{
			toggle: property,
			icon: 'swap-horizontal-circle',
		},
		{
			toggle: constant,
			icon: 'lock',
		},
	]

	return (
		<List.Item
			title={description}
			right={() =>
				icons
					.filter(i => i.toggle)
					.map((icon, i) => (
						<List.Icon
							key={i}
							icon={icon.icon}
							color={theme.colors.text}
							style={styles.lockIcon}
						/>
					))
			}></List.Item>
	)
}

const styles = StyleSheet.create({
	lockIcon: {
		transform: [{ scale: 0.8 }],
	},
})

export default withTheme(AttributeItem)
