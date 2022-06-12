import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { IconButton } from 'react-native-paper'
import { Expression, Node } from 'wollok-ts/dist/model'
import {
	LiteralSegment,
	MessageSegment,
	ReferenceSegment,
} from './expression-segment'

export function ExpressionDisplay(props: {
	expression?: Expression
	backgroundColor?: ViewStyle['backgroundColor']
	/**
	 * @description Whether to show the code icon on the display.
	 * @default true
	 */
	withIcon?: boolean
	highlightedNode?: Node
}) {
	const {
		expression,
		backgroundColor,
		withIcon,
		highlightedNode,
		...innerProps
	} = props
	const showIcon = withIcon === undefined ? true : withIcon
	return (
		<View
			style={[display, { backgroundColor: backgroundColor }]}
			{...innerProps}>
			{showIcon && <IconButton style={codeIcon} icon="chevron-right" />}
			{expression && getVisualSegment(expression, 0, highlightedNode)}
		</View>
	)
}

// TODO: Convert to component
export function getVisualSegment(
	expression: Expression,
	i: number,
	highlightedNode?: Node,
): JSX.Element {
	const highlighted = highlightedNode === expression
	switch (expression.kind) {
		case 'Reference':
			return (
				<ReferenceSegment
					text={expression.name}
					key={i}
					index={i}
					highlighted={highlighted}
				/>
			)
		case 'Send':
			return (
				<MessageSegment
					send={expression}
					key={i}
					index={i}
					highlightedNode={highlightedNode}
					highlighted={highlighted}
				/>
			)
		case 'Literal':
			return (
				<LiteralSegment
					value={expression.value}
					key={i}
					index={i}
					highlighted={highlighted}
				/>
			)
		case 'Self':
			return (
				<ReferenceSegment
					text={'SELF'}
					key={i}
					index={i}
					highlighted={highlighted}
				/>
			)
		default:
			throw Error(`Not supported expression ${expression.kind}`)
	}
}

export const { display, codeIcon } = StyleSheet.create({
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
