import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { IconButton, Text } from 'react-native-paper'
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
	const [state, setState] = useState(execution.stepIn())
	const [node, setNode] = useState(!state.done ? state.next : null)
	const [body, setBody] = useState(
		node ? [node, ...node.ancestors()].find(is('Body')) : null,
	)

	const stepIn = () => {
		const newState = execution.stepIn()
		console.log({ newState })
		setState(newState)
		setNode(!newState.done ? newState.next : null)
		const newBody = !newState.done
			? [newState.next, ...newState.next.ancestors()].find(is('Body'))
			: null
		console.log(newBody?.parent)
		setBody(newBody)
		setExecution(execution)
	}

	const stepOver = () => {
		const newState = execution.stepOver()
		setState(newState)
		setNode(!newState.done ? newState.next : null)
		setBody(
			!newState.done
				? [newState.next, ...newState.next.ancestors()].find(is('Body'))
				: null,
		)
		setExecution(execution)
	}

	const stepOut = () => {
		const newState = execution.stepOut()
		setState(newState)
		setNode(!newState.done ? newState.next : null)
		setBody(
			!newState.done
				? [newState.next, ...newState.next.ancestors()].find(is('Body'))
				: null,
		)
		setExecution(execution)
	}

	const stepThrough = () => {
		const newState = execution.stepThrough()
		setState(newState)
		setNode(!newState.done ? newState.next : null)
		setBody(
			!newState.done
				? [newState.next, ...newState.next.ancestors()].find(is('Body'))
				: null,
		)
		setExecution(execution)
	}

	if (node) {
		console.log('NEXT', node)
		console.log('ERROR', state.error)
		if (!body && !node.is('Method')) {
			console.log(`BODY NOT FOUND ${node.kind}`)
			return (
				<>
					<Text>{node.kind} ????</Text>

					<Row>
						<IconButton icon={'chevron-right'} onPress={stepOver} />
						<IconButton icon={'chevron-double-right'} onPress={stepIn} />
						<IconButton icon={'chevron-down'} onPress={stepThrough} />
						<IconButton icon={'chevron-up'} onPress={stepOut} />
					</Row>
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
				<Row>
					<IconButton icon={'chevron-right'} onPress={stepOver} />
					<IconButton icon={'chevron-double-right'} onPress={stepIn} />
					<IconButton icon={'chevron-down'} onPress={stepThrough} />
					<IconButton icon={'chevron-up'} onPress={stepOut} />
				</Row>
			</>
		)
	}
	console.log('DONE', state.error)

	return <Text>FINISH</Text>
}

export default Debugger
