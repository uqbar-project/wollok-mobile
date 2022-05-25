import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { Divider, List, Text } from 'react-native-paper'
import { ExecutionState } from 'wollok-ts/dist/interpreter/interpreter'
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
	const test = entityMemberByFQN(project, fqn) as Test
	const [interpreter, setInterpreter] = useState(newInterpreter())
	const executionDirector = interpreter.exec(test)
	const baseState = executionDirector.resume(n => n === test.body)
	const [execution, setExecution] = useState(executionDirector)
	const [state, setState] = useState<ExecutionState<void>>(baseState)

	function updateState(newState: ExecutionState<void>) {
		setInterpreter(interpreter)
		setExecution(execution)
		setState(newState)
	}

	if (!execution) {
		return <Text>Waiting</Text>
	}

	return (
		<List.Section>
			<ScrollView>
				<List.Accordion
					// title={wTranslate('entityDetails.attributes').toUpperCase()}
					title={'STACK'}
					// onPress={() => switchExpanded()}
				>
					<StackInspector evaluation={interpreter.evaluation} />
				</List.Accordion>
				<Divider />
				<List.Accordion
					style={{ height: 100 }}
					expanded={true}
					title={'SOURCE'}>
					<SourceInspector state={state} />
				</List.Accordion>
				<List.Accordion style={{ height: 100 }} title={'LOCALS'}>
					<LocalsInspector interpreter={interpreter} />
				</List.Accordion>
			</ScrollView>
			<DebuggerButtons execution={execution} updateState={updateState} />
		</List.Section>
	)
}

export default Debugger
