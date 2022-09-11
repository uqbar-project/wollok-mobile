import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Body } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import { BodyMaker } from '../components/sentences/BodyMaker'
import { useProject } from '../context/ProjectProvider'
import { CodeContainer, entityMemberByFQN } from '../utils/wollok-helpers'

export type EditorScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Editor'
>

type Route = RouteProp<RootStackParamList, 'Editor'>

const Editor = ({
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
		changeMember(parent)(entity, entity.copy({ body }) as CodeContainer)
	}

	return <BodyMaker codeContainer={entity} setBody={setBody} />
}

export default gestureHandlerRootHOC(Editor)
