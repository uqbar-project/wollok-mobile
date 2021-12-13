import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useExpression } from '../../context/ExpressionProvider'
import { Segment } from '../../models/expression'
import { Method } from '../../models/method'
import { Entity } from '../../models/entity'
import { MethodSegment, ObjectSegment } from './expression-segment'

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
			<ObjectSegment text={segment.name} key={segment.name} index={index} />
		)
	} else if (segment instanceof Method) {
		segmentComponent = (
			<MethodSegment method={segment} key={segment.name} index={index} />
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
