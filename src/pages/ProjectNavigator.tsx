import { RouteProp } from '@react-navigation/core'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Name } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import { ProjectProvider } from '../context/ProjectProvider'
import EntityStack from './EntityStack'
import { Home } from './Home'

export type ProjectStackParamList = {
	Home: undefined
	EntityStack: { entityFQN: Name }
}

const Stack = createStackNavigator<ProjectStackParamList>()

export type ProjectStackRoute = RouteProp<
	RootStackParamList,
	'ProjectNavigator'
>

export function ProjectNavigator({ route }: { route: ProjectStackRoute }) {
	return (
		<ProjectProvider
			projectName={route.params.name}
			initialProject={route.params.project}>
			<Stack.Navigator screenOptions={{ headerStyle }} mode="modal">
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen
					name="EntityStack"
					component={EntityStack}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</ProjectProvider>
	)
}

const headerStyle = { elevation: 0, shadowOpacity: 0 }
