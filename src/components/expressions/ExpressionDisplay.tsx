import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useExpression } from '../../context/ExpressionProvider'
import { Segment } from '../../models/expression/expression'
import { MethodSegment as Method } from '../../models/expression/segments'
import { Entity } from '../../models/entity'
import {
	LiteralSegment,
	MethodSegment,
	ObjectSegment,
} from './expression-segment'
import { Literal } from '../../models/expression/segments'

export function ExpressionDisplay() {
	const { expression } = useExpression()
	return (
		<View style={display}>{expression.segments.map(getVisualSegment)}</View>
	)
}

function getVisualSegment(segment: Segment, index: number): JSX.Element {
	let segmentComponent: JSX.Element

	if (segment instanceof Entity) {
		segmentComponent = (
			<ObjectSegment text={segment.name} key={index} index={index} />
		)
	} else if (segment instanceof Method) {
		segmentComponent = (
			<MethodSegment method={segment.method} key={index} index={index} />
		)
	} else if (segment instanceof Literal) {
		segmentComponent = (
			<LiteralSegment literal={segment} key={index} index={index} />
		)
	} else {
		throw Error('No segment')
	}
	return segmentComponent
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
