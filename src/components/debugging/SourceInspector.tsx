import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { is, Node } from 'wollok-ts/dist/model'
import { useExecutionContext } from '../../context/ExecutionContextProvider'
import { CodeContainer } from '../../utils/wollok-helpers'
import SentencesView from '../sentences/SentencesView'

function SourceInspector() {
	const { state } = useExecutionContext()
	if (state.done) {
		// TODO: state.error
		return <Text>FINISH</Text>
	}

	function findContainer(node: Node): CodeContainer | undefined {
		if (node.is('Method')) {
			return node
		}
		if (node.is('Test')) {
			return node
		}
		const container = [node, ...node.ancestors()].find(is('Body'))?.parent

		// TODO: If view
		if (container?.is('If')) {
			return findContainer(container)
		}

		return container as CodeContainer
	}

	const container = findContainer(state.next)

	if (!container) {
		return <Text>SHOW ERROR: {state.next.kind}</Text>
	}

	return (
		<View style={{ minHeight: 200 }}>
			<SentencesView
				sentences={container.sentences()}
				highlightedNode={state.next}
			/>
		</View>
	)
}

export default SourceInspector
