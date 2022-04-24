import { RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Module } from 'wollok-ts/dist/model'
import { ModuleDetails } from '../components/entity-detail/ModuleDetails'
import { Tests } from '../components/tests/Tests'
import { useProject } from '../context/ProjectProvider'
import { ProjectStackParamList } from './ProjectNavigator'

export type EntityDetailsRoute = RouteProp<
	ProjectStackParamList,
	'EntityDetails'
>

function EntityDetails(props: { route: EntityDetailsRoute }) {
	const { project } = useProject()
	const entity = project.getNodeByFQN<Module>(props.route.params.entityFQN)

	const navigation = useNavigation()
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: entity.name,
			headerTitleAlign: 'center',
		})
	}, [navigation, entity])

	return entity.is('Describe') ? (
		<Tests describe={entity} />
	) : (
		<ModuleDetails module={entity} />
	)
}

export default EntityDetails
