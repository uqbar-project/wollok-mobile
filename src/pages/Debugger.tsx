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
import {
	allScopedVariables,
	entityMemberByFQN,
	entityMemberFQN,
	EntityMemberWithBody,
} from '../utils/wollok-helpers'

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
	const execution = exec(test)
	const [state, setState] = useState(execution.stepThrough())

	function stepIn() {
		setState(execution.stepIn())
	}

	function stepOver() {
		setState(execution.stepOver())
	}

	function stepOut() {
		setState(execution.stepOut())
	}

	function stepThrough() {
		setState(execution.stepThrough())
	}

	if (!state.done) {
		console.log('NEXT', state.next)
		console.log('ERROR', state.error)
		const body = state.next.ancestors().find(is('Body'))
		if (!body) {
			throw 'BODY NOT FOUND'
		}
		const entity = body.parent as EntityMemberWithBody
		return (
			<>
				<BodyMaker
					sentences={entity.sentences()}
					variables={allScopedVariables(entity)}
					contextFQN={entityMemberFQN(entity)}
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
