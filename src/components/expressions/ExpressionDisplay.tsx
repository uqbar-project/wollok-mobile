import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useExpression } from '../../context/ExpressionProvider'
import { Pill } from './expression-segment'

export function ExpressionDisplay() {
	const { expression } = useExpression()
	return (
		<View style={display}>
			{expression.segments.map(s => (
				<Pill text={s.name} />
			))}
		</View>
	)
}

const { display } = StyleSheet.create({
	display: {
		height: 40,
		flexDirection: 'row',
		backgroundColor: 'white',
		display: 'flex',
		paddingVertical: 5,
		paddingLeft: 2,
	},
})
