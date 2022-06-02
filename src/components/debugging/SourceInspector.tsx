import React from 'react'
import { Text } from 'react-native-paper'
import { is, Node } from 'wollok-ts/dist/model'
import { ExecutionState } from 'wollok-ts/dist/interpreter/interpreter'
import { log } from '../../utils/commons'
import { CodeContainer } from '../../utils/wollok-helpers'
import { BodyMaker } from '../Body/BodyMaker'
import { View } from 'react-native'

export type SourceInspectorProps = {
	state: ExecutionState<void>
}

function SourceInspector({ state }: SourceInspectorProps) {
	if (state.done) {
		// TODO: state.error
		return <Text>FINISH</Text>
	}

	function findContainer(node: Node) {
		if (node.is('Method')) {
			return node
		}
		if (node.is('Test')) {
			return node
		}
		return [node, ...node.ancestors()].find(is('Body'))?.parent
	}

	const container = findContainer(state.next)

	// TODO: Fix if
	if (!container || container.is('If')) {
		return (
			<>
				<Text>
					ERROR: {state?.next.kind} - {container?.kind}
				</Text>
			</>
		)
	}

	return (
		<View style={{ minHeight: 200 }}>
			<BodyMaker
				codeContainer={container as CodeContainer}
				highlightedNode={state.next}
				setBody={log}
			/>
		</View>
	)
}

export default SourceInspector
