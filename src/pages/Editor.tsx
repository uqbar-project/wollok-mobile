import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Body } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import { BodyMaker } from '../components/Body/BodyMaker'
import { useProject } from '../context/ProjectProvider'
import {
	allScopedVariables,
	entityMemberByFQN,
	EntityMemberWithBody,
} from '../utils/wollok-helpers'

export type EditorScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Editor'
>

type Route = RouteProp<RootStackParamList, 'Editor'>

export const Editor = ({
	route: {
		params: { fqn },
	},
}: {
	route: Route
}) => {
	const {
		project,
		actions: { changeMember },
	} = useProject()
	const entity = entityMemberByFQN(project, fqn)
	const parent = entity.parent

	const navigation = useNavigation()
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: entity.name,
			headerTitleAlign: 'center',
			animationEnabled: false,
		})
	}, [navigation, entity])

	function setBody(body: Body) {
		changeMember(parent)(entity, entity.copy({ body }) as EntityMemberWithBody)
	}

	return (
		<BodyMaker
			sentences={entity.sentences()}
			variables={allScopedVariables(entity)}
			contextFQN={fqn}
			setBody={setBody}
		/>
	)
}
