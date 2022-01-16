import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useExpression } from '../../context/ExpressionProvider'
import { Segment } from '../../models/expression/segments'
import {
	LiteralSegment,
	MethodSegment,
	ObjectSegment,
} from './expression-segment'

export function ExpressionDisplay() {
	const { expression } = useExpression()
	return (
		<View style={display}>{expression.segments.map(getVisualSegment)}</View>
	)
}

function getVisualSegment(segment: Segment, index: number): JSX.Element {
	switch (segment.node.kind) {
		// case 'Singleton':
		// 	return <ObjectSegment text={segment.name} key={index} index={index} />
		// case 'Method':
		// 	return <MethodSegment method={segment.} key={index} index={index} />
		case 'Literal':
			return <LiteralSegment value={segment.node.value} key={index} index={index} />
		default:
			throw Error('No segment')
	}
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
