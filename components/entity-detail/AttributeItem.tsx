import React from 'react'
import { StyleSheet } from 'react-native'
import { List, withTheme } from 'react-native-paper'
import { Attribute } from '../../models/entity'
import { Theme } from '../../theme'

function AttributeItem(props: { attribute: Attribute; theme: Theme }) {
	const {
		attribute: { constant, description },
		theme,
	} = props
	return (
		<List.Item
			title={description}
			right={() => {
				return constant ? (
					<List.Icon
						icon="lock"
						color={theme.colors.text}
						style={styles.lockIcon}></List.Icon>
				) : null
			}}></List.Item>
	)
}

const styles = StyleSheet.create({
	lockIcon: {
		transform: [{ scale: 0.8 }],
	},
})

export default withTheme(AttributeItem)
