import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import { ExecutionState } from 'wollok-ts/dist/interpreter/interpreter'
import { Test } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import SourceInspector from '../components/debugging/SourceInspector'
import DebuggerButtons from '../components/debugging/StepButtons'
import { useProject } from '../context/ProjectProvider'
import { entityMemberByFQN } from '../utils/wollok-helpers'

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
	const [state, setState] = useState<ExecutionState<void>>({
		next: test,
		done: false,
	})

	function updateState(newState: ExecutionState<void>) {
		setExecution(execution)
		setState(newState)
	}

	if (!execution) {
		return <Text>Waiting</Text>
	}

	return (
		<>
			<SourceInspector state={state} />
			<DebuggerButtons execution={execution} updateState={updateState} />
		</>
	)
}

export default Debugger
