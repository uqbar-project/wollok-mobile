import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Expression } from '../../models/expression/expression'
import { Segment } from '../../models/expression/segments'
import { LiteralSegment } from './expression-segment'

export function ExpressionDisplay(props: {
	expression: Expression
	displayColor?: ViewStyle['backgroundColor']
}) {
	return (
		<View style={[display, { backgroundColor: props.displayColor }]}>
			{props.expression.segments.map(getVisualSegment)}
		</View>
	)
}

function getVisualSegment(segment: Segment, index: number): JSX.Element {
	switch (segment.node.kind) {
		// case 'Singleton':
		// 	return <ObjectSegment text={segment.name} key={index} index={index} />
		// case 'Method':
		// 	return <MethodSegment method={segment.} key={index} index={index} />
		case 'Literal':
			return (
				<LiteralSegment value={segment.node.value} key={index} index={index} />
			)
		default:
			throw Error('No segment')
	}
}

const { display } = StyleSheet.create({
	display: {
		height: 40,
		flexDirection: 'row',
		display: 'flex',
		paddingVertical: 5,
		paddingLeft: 2,
	},
})
