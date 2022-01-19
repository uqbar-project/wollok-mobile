import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { IconButton } from 'react-native-paper'
import { Expression } from '../../models/expression/expression'
import { Segment } from '../../models/expression/segments'
import { LiteralSegment } from './expression-segment'

export function ExpressionDisplay(props: {
	expression: Expression
	backgroundColor?: ViewStyle['backgroundColor']
}) {
	return (
		<View style={[display, { backgroundColor: props?.backgroundColor }]}>
			<IconButton style={codeIcon} icon="chevron-right" />
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
			throw new Error('No segment')
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
