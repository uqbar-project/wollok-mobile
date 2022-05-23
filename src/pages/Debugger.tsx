import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { IconButton, Text } from 'react-native-paper'
import { ExecutionState } from 'wollok-ts/dist/interpreter/interpreter'
import { is, Test } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import { BodyMaker } from '../components/Body/BodyMaker'
import { Row } from '../components/ui/Row'
import { useProject } from '../context/ProjectProvider'
import { log } from '../utils/commons'
import { CodeContainer, entityMemberByFQN } from '../utils/wollok-helpers'

export type EditorScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Debugger'
>

type Route = RouteProp<RootStackParamList, 'Debugger'>

const Debugger = ({
	route: {
		params: { fqn },
	},
}: {
	route: Route
}) => {
	const {
		project,
		actions: { execution: exec },
	} = useProject()
	const test = entityMemberByFQN(project, fqn) as Test
	const [execution, setExecution] = useState(exec(test))
	const [state, setState] = useState<ExecutionState<void> | null>(null)

	function updateState(newState: ExecutionState<void>) {
		setExecution(execution)
		setState(newState)
	}

	function stepIn() {
		updateState(execution.stepIn())
	}
	function stepOut() {
		updateState(execution.stepOut())
	}
	function stepOver() {
		updateState(execution.stepOver())
	}
	function stepThrough() {
		updateState(execution.stepThrough())
	}

	function DebuggerButtons() {
		return (
			<Row>
				<IconButton icon={'chevron-right'} onPress={stepOver} />
				<IconButton icon={'chevron-double-right'} onPress={stepIn} />
				<IconButton icon={'chevron-down'} onPress={stepThrough} />
				<IconButton icon={'chevron-up'} onPress={stepOut} />
			</Row>
		)
	}

	if (state && state.done) {
		console.log('DONE', state.error)
		return <Text>FINISH</Text>
	}

	// const container = state ? state.next : test

	if (state === null) {
		return (
			<>
				<BodyMaker codeContainer={test} setBody={log} />
				<DebuggerButtons />
			</>
		)
	}
	const node = !state.done ? state.next : null

	if (node) {
		console.log('NEXT', node)
		console.log('ERROR', state.error)
		const body = [node, ...node.ancestors()].find(is('Body'))
		if (!body && !node.is('Method')) {
			return (
				<>
					<Text>HOW TO SHOW {node.kind}?</Text>
					<DebuggerButtons />
				</>
			)
		}
		const entity = node.is('Method') ? node : body!.parent
		console.log({ entity })
		return (
			<>
				<BodyMaker
					codeContainer={entity as CodeContainer}
					highlightedNode={node}
					setBody={log}
				/>
				<DebuggerButtons />
			</>
		)
	}
}

export default Debugger
