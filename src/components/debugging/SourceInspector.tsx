import React from 'react'
import { Text } from 'react-native-paper'
import { is, Node } from 'wollok-ts/dist/model'
import { ExecutionState } from 'wollok-ts/dist/interpreter/interpreter'
import { log } from '../../utils/commons'
import { CodeContainer } from '../../utils/wollok-helpers'
import { BodyMaker } from '../Body/BodyMaker'

export type SourceInspectorProps = {
	state: ExecutionState<void>
}

function SourceInspector({ state }: SourceInspectorProps) {
	if (state.done) {
		console.log('DONE', state.error)
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
					ERROR: {state?.next.kind} - {container}
				</Text>
			</>
		)
	}

	return (
		<BodyMaker
			codeContainer={container as CodeContainer}
			highlightedNode={state.next}
			setBody={log}
		/>
	)
}

export default SourceInspector
