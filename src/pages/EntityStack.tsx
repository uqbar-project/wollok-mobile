import { RouteProp } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Expression, Method, Module, Name, Send } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import { EntityProvider } from '../context/EntityProvider'
import { useProject } from '../context/ProjectProvider'
import { log } from '../utils/commons'
import { wTranslate } from '../utils/translation-helpers'
import {
	entityMemberLabel,
	EntityMemberWithBody,
} from '../utils/wollok-helpers'
import { EntityDetails } from './EntityDetails/EntityDetails'
import { EntityMemberDetail } from './EntityMemberDetail'
import ExpressionMaker, {
	ExpressionOnSubmit,
} from './ExpressionMaker/ExpressionMaker'
import { NewMessageCall } from './NewMessageCall'
import { Tests } from './Tests'

export type EntityStackRoute = RouteProp<RootStackParamList, 'EntityStack'>

export type EntityStackParamList = {
	EntityDetails: undefined
	Tests: undefined
	EntityMemberDetails: {
		entityMember: EntityMemberWithBody
		fqn: Name
	}
	ExpressionMaker: {
		onSubmit: ExpressionOnSubmit
		contextFQN: Name
		initialExpression?: Expression
	}
	NewMessageSend: {
		receiver: Expression
		method: Method
		contextFQN: Name
		onSubmit: (s: Send) => void
	}
}

export default function (props: { route: EntityStackRoute }) {
	const { project } = useProject()
	const Stack = createStackNavigator<EntityStackParamList>()
	log(props.route.params.entityFQN)
	const entity = project.getNodeByFQN<Module>(props.route.params.entityFQN)
	return (
		<EntityProvider entity={entity}>
			<Stack.Navigator>
				{entity.is('Describe') ? (
					<Stack.Screen
						name="Tests"
						component={Tests}
						options={{
							title: entity.name,
							headerTitleAlign: 'center',
							animationEnabled: false,
						}}
					/>
				) : (
					<Stack.Screen
						name="EntityDetails"
						component={EntityDetails}
						options={{
							title: entity.name,
							headerTitleAlign: 'center',
							animationEnabled: false,
						}}
					/>
				)}
				<Stack.Screen
					name="EntityMemberDetails"
					component={EntityMemberDetail}
					options={({ route: methodRoute }) => ({
						title: entityMemberLabel(methodRoute.params.entityMember),
					})}
				/>
				<Stack.Screen
					name="ExpressionMaker"
					component={ExpressionMaker}
					options={{
						title: wTranslate('expression.title'),
						headerTitleAlign: 'center',
						animationEnabled: false,
					}}
				/>
				<Stack.Screen
					name="NewMessageSend"
					component={NewMessageCall}
					options={route => ({ title: route.route.params.method.name })}
				/>
			</Stack.Navigator>
		</EntityProvider>
	)
}
