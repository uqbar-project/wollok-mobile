import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { IconButton } from 'react-native-paper'
import { Expression } from 'wollok-ts/dist/model'
import { LiteralSegment } from './expression-segment'

export function ExpressionDisplay(props: {
	expression?: Expression
	backgroundColor?: ViewStyle['backgroundColor']
	withIcon?: boolean
}) {
	const { expression, backgroundColor } = props
	const showIcon = props.withIcon === undefined ? true : props.withIcon
	return (
		<View style={[display, { backgroundColor: backgroundColor }]}>
			{showIcon && <IconButton style={codeIcon} icon="chevron-right" />}
			{expression && getVisualSegment(expression)}
		</View>
	)
}

function getVisualSegment(expression: Expression): JSX.Element {
	var i = 1
	switch (expression.kind) {
		// case 'Singleton':
		// 	return <ObjectSegment text={segment.name} key={index} index={index} />
		// case 'Method':
		// 	return <MethodSegment method={segment.} key={index} index={index} />
		case 'Literal':
			return <LiteralSegment value={expression.value} key={i} index={i} />
		default:
			throw Error(`Not supported expression ${expression.kind}`)
	}
}

const { display, codeIcon } = StyleSheet.create({
	display: {
		height: 40,
		alignItems: 'center',
		flexDirection: 'row',
		display: 'flex',
		paddingVertical: 5,
	},
	codeIcon: {
		marginRight: -9,
	},
})
