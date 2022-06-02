import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Divider, List, Text } from 'react-native-paper'
import {
	DirectedInterpreter,
	ExecutionDirector,
	ExecutionState,
} from 'wollok-ts/dist/interpreter/interpreter'
import { Test } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import LocalsInspector from '../components/debugging/LocalsInspector'
import SourceInspector from '../components/debugging/SourceInspector'
import StackInspector from '../components/debugging/StackInspector'
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
		actions: { newInterpreter },
	} = useProject()
	const [interpreter, setInterpreter] = useState<DirectedInterpreter>(
		null as any,
	)
	const [execution, setExecution] = useState<ExecutionDirector<void>>(
		null as any,
	)
	const [state, setState] = useState<ExecutionState<void>>(null as any)

	useEffect(() => {
		const test = entityMemberByFQN(project, fqn) as Test
		const interpreter = newInterpreter()
		const executionDirector = interpreter.exec(test)
		const baseState = executionDirector.resume(n => n === test.body)
		setInterpreter(interpreter)
		setExecution(executionDirector)
		setState(baseState)
	}, [fqn, newInterpreter, project])

	function updateState(newState: ExecutionState<void>) {
		setInterpreter(interpreter)
		setExecution(execution)
		setState(newState)
	}

	if (!interpreter) {
		return <Text>Waiting</Text>
	}

	return (
		<View style={{ height: '100%' }}>
			<ScrollView style={{ height: '90%' }}>
				<List.Accordion
					// title={wTranslate('entityDetails.attributes').toUpperCase()}
					title={'STACK'}>
					<StackInspector evaluation={interpreter.evaluation} />
				</List.Accordion>
				<Divider />
				<List.Accordion expanded={true} title={'SOURCE'}>
					<SourceInspector state={state} />
				</List.Accordion>
				<List.Accordion title={'LOCALS'}>
					<LocalsInspector interpreter={interpreter} />
				</List.Accordion>
			</ScrollView>
			<DebuggerButtons execution={execution} updateState={updateState} />
		</View>
	)
}

export default Debugger
