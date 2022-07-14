import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { IconButton } from 'react-native-paper'
import { Expression, Node, Parameter, Send } from 'wollok-ts/dist/model'
import {
	LiteralSegment,
	MessageSegment,
	ReferenceSegment,
} from './expression-segment'

export type SelectExpression = (
	selected: Expression | Parameter,
	send?: Send,
) => void

export function ExpressionDisplay(props: {
	expression?: Expression
	backgroundColor?: ViewStyle['backgroundColor']
	/**
	 * @description Whether to show the code icon on the display.
	 * @default true
	 */
	withIcon?: boolean
	highlightedNode?: Node
	onSelect?: SelectExpression
}) {
	const {
		expression,
		backgroundColor,
		withIcon,
		highlightedNode,
		onSelect,
		...innerProps
	} = props
	const showIcon = withIcon === undefined ? true : withIcon
	return (
		<View
			style={[display, { backgroundColor: backgroundColor }]}
			{...innerProps}>
			{showIcon && <IconButton style={codeIcon} icon="chevron-right" />}
			{expression && getVisualSegment(expression, 0, highlightedNode, onSelect)}
		</View>
	)
}

// TODO: Convert to component
export function getVisualSegment(
	expression: Expression,
	i: number,
	highlightedNode?: Node,
	onSelect?: SelectExpression,
): JSX.Element {
	const highlighted = highlightedNode === expression
	const onPress = onSelect && (() => onSelect(expression))

	const innerProps = {
		key: i,
		index: i,
		highlighted,
		onPress,
	}

	switch (expression.kind) {
		case 'Reference':
			return <ReferenceSegment text={expression.name} {...innerProps} />
		case 'Send':
			return (
				<MessageSegment
					send={expression}
					highlightedNode={highlightedNode}
					onSelect={onSelect}
					{...innerProps}
				/>
			)
		case 'Literal':
			return <LiteralSegment value={expression.value} {...innerProps} />
		case 'Self':
			return <ReferenceSegment text={'SELF'} {...innerProps} />
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
