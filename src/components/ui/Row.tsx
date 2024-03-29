import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { ParentComponentProp } from '../../utils/type-helpers'

export function Row(
	props: ParentComponentProp<{
		style?: StyleProp<ViewStyle>
		key?: string | number
	}>,
) {
	const { children, style, ...viewProps } = props
	return (
		<View style={[styles.row, style]} {...viewProps}>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
	},
})
