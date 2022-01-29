import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { upperCaseFirst } from 'upper-case-first'
import { RootStackParamList } from '../App'
import { wTranslate } from '../utils/translation-helpers'
import { Describes } from './Describes'
import { Entities } from './Entities/Entities'

export type HomeScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Home'
>

const Tab = createBottomTabNavigator()

export function Home() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name={upperCaseFirst(wTranslate('entities.title'))}
				component={Entities}
			/>
			<Tab.Screen
				name={upperCaseFirst(wTranslate('tests.title'))}
				component={Describes}
			/>
		</Tab.Navigator>
	)
}
