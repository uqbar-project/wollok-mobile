import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { Test } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import ExecutionStepButtons from '../components/debugging/ExecutionStepButtons'
import LocalsInspector from '../components/debugging/LocalsInspector'
import SourceInspector from '../components/debugging/SourceInspector'
import StackInspector from '../components/debugging/StackInspector'
import Accordion from '../components/ui/Accordion'
import { ExecutionContextProvider } from '../context/ExecutionContextProvider'
import { useProject } from '../context/ProjectProvider'
import { wTranslate } from '../utils/translation-helpers'

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
		<ExecutionContextProvider container={test}>
			<View style={{ height: '100%' }}>
				<ScrollView>
					<Accordion
						initialExpanded={true}
						title={wTranslate('debugger.source').toUpperCase()}>
						<SourceInspector />
					</Accordion>
					<Divider />
					<Accordion title={wTranslate('debugger.locals').toUpperCase()}>
						<LocalsInspector />
					</Accordion>
					<Divider />
					<Accordion title={wTranslate('debugger.stack').toUpperCase()}>
						<StackInspector />
					</Accordion>
				</ScrollView>
				<Divider />
				<ExecutionStepButtons />
			</View>
		</ExecutionContextProvider>
	)
}

export default Debugger
