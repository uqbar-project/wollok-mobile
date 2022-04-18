import { RouteProp } from '@react-navigation/core'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Expression, Method, Name, Send } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import { ProjectProvider } from '../context/ProjectProvider'
import { ArgumentsMaker } from './ArgumentsMaker'
import { Editor } from './Editor'
import EntityStack from './EntityStack'
import ExpressionMaker, { ExpressionOnSubmit } from './ExpressionMaker'
import { Home } from './Home'

export type ProjectStackParamList = {
	Home: undefined
	EntityStack: { entityFQN: Name }
	Editor: {
		fqn: Name
	}
	ExpressionMaker: {
		onSubmit: ExpressionOnSubmit
		contextFQN: Name
		initialExpression?: Expression
	}
	ArgumentsMaker: {
		receiver: Expression
		method: Method
		contextFQN: Name
		onSubmit: (s: Send) => void
	}
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
				<Stack.Screen name="EntityStack" component={EntityStack} />
				<Stack.Screen name="Editor" component={Editor} />
				<Stack.Screen name="ExpressionMaker" component={ExpressionMaker} />
				<Stack.Screen name="ArgumentsMaker" component={ArgumentsMaker} />
			</Stack.Navigator>
		</ProjectProvider>
	)
}

const headerStyle = { elevation: 0, shadowOpacity: 0 }
