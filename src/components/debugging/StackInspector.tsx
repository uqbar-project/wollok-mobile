import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Evaluation, Frame } from 'wollok-ts/dist/interpreter/runtimeModel'

export type StackInspectorProps = {
	evaluation: Evaluation
}

function StackInspector({ evaluation }: StackInspectorProps) {
	return (
		<View>
			{[...evaluation.frameStack].reverse().map((frame, i) => (
				<View key={`${i}`}>
					<FrameItem item={frame} />
				</View>
			))}
		</View>
	)
}

function FrameItem({ item: frame }: { item: Frame }) {
	return (
		<Text>
			{frame.id} - {frame.description}
		</Text>
	)
}

export default StackInspector
