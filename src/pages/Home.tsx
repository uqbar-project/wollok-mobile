import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { upperCaseFirst } from 'upper-case-first'
import { wTranslate } from '../utils/translation-helpers'
import { Entities } from './Entities/Entities'
import { Tests } from './Tests'

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
				component={Tests}
			/>
		</Tab.Navigator>
	)
}
