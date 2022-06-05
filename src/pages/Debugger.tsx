import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Divider, List } from 'react-native-paper'
import { Test } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import LocalsInspector from '../components/debugging/LocalsInspector'
import SourceInspector from '../components/debugging/SourceInspector'
import StackInspector from '../components/debugging/StackInspector'
import DebuggerButtons from '../components/debugging/StepButtons'
import { ExecutionContextProvider } from '../context/ExecutionContextProvider'
import { useProject } from '../context/ProjectProvider'

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
	const { project } = useProject()
	const test = project.getNodeByFQN<Test>(fqn)

	return (
		<ExecutionContextProvider code={test}>
			<View style={{ height: '100%' }}>
				<ScrollView style={{ height: '90%' }}>
					<List.Accordion
						// title={wTranslate('entityDetails.attributes').toUpperCase()}
						title={'STACK'}>
						<StackInspector />
					</List.Accordion>
					<Divider />
					<List.Accordion expanded={true} title={'SOURCE'}>
						<SourceInspector />
					</List.Accordion>
					<List.Accordion title={'LOCALS'}>
						<LocalsInspector />
					</List.Accordion>
				</ScrollView>
				<DebuggerButtons />
			</View>
		</ExecutionContextProvider>
	)
}

export default Debugger
