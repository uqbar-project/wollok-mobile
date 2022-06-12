import React from 'react'
import { View } from 'react-native'
import { Divider, IconButton, List, Text } from 'react-native-paper'
import { Frame } from 'wollok-ts/dist/interpreter/runtimeModel'
import { Node } from 'wollok-ts/dist/model'
import { useExecutionContext } from '../../context/ExecutionContextProvider'
import { wTranslate } from '../../utils/translation/translation-helpers'

function StackInspector() {
	const { interpreter } = useExecutionContext()
	const [, ...stack] = interpreter.evaluation.frameStack

	if (!stack.length) {
		return <List.Item title={wTranslate('debugger.done.stack')} />
	}

	return (
		<View>
			{stack.reverse().map((frame, i) => (
				<View key={`${frame.node.id}${i}`}>
					<FrameItem item={frame} />
					<Divider />
				</View>
			))}
		</View>
	)
}

function FrameItem({ item: frame }: { item: Frame }) {
	return (
		<List.Item
			title={frame.description}
			left={() => <WollokIcon node={frame.node} />}
		/>
	)
}

type WollokIconProps = { node: Node }
function WollokIcon({ node }: WollokIconProps) {
	switch (node.kind) {
		case 'Test':
			return <IconButton icon={'flask'} />
		case 'Method':
			return <IconButton icon={'message'} />
		case 'Body':
			return <WollokIcon node={node.parent} />
		default:
			return <Text>{'BUU'}</Text>
	}
}

export default StackInspector
