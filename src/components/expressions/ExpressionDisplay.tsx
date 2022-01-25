import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { IconButton } from 'react-native-paper'
import { Expression } from 'wollok-ts/dist/model'
import {
	LiteralSegment,
	MessageSegment,
	ReferenceSegment,
} from './expression-segment'

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
			{expression && getVisualSegment(expression, 0)}
		</View>
	)
}

// TODO: Convert to component
export function getVisualSegment(
	expression: Expression,
	i: number,
): JSX.Element {
	switch (expression.kind) {
		case 'Reference':
			return <ReferenceSegment text={expression.name} key={i} index={i} />
		case 'Send':
			return <MessageSegment send={expression} key={i} index={i} />
		case 'Literal':
			return <LiteralSegment value={expression.value} key={i} index={i} />
		default:
			throw Error(`Not supported expression ${expression.kind}`)
	}
}

const { display, codeIcon } = StyleSheet.create({
	display: {
		paddingVertical: 4,
		height: 35,
		alignItems: 'center',
		flexDirection: 'row',
		display: 'flex',
	},
	codeIcon: {
		marginRight: -9,
	},
})
