import React from 'react'
import { View } from 'react-native'
import { Divider, IconButton, Text } from 'react-native-paper'
import { Frame } from 'wollok-ts/dist/interpreter/runtimeModel'
import { Node } from 'wollok-ts/dist/model'
import { useExecutionContext } from '../../context/ExecutionContextProvider'
import { Row } from '../ui/Row'

function StackInspector() {
	const { interpreter } = useExecutionContext()
	const [, ...stack] = interpreter.evaluation.frameStack
	return (
		<View>
			{stack.reverse().map((frame, i) => (
				<View key={`${frame.node.id}${i}`}>
					<FrameItem item={frame} />
				</View>
			))}
		</View>
	)
}

function FrameItem({ item: frame }: { item: Frame }) {
	return (
		<>
			<Row>
				<WollokIcon node={frame.node} />
				<Text>{frame.description}</Text>
			</Row>
			<Divider />
		</>
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