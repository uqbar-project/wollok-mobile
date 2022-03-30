import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { IconButton, Snackbar } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { useProject } from '../context/ProjectProvider'
import { saveProject } from '../services/persistance.service'
import { wTranslate } from '../utils/translation-helpers'
import { Describes } from './Describes'
import { Entities } from './Entities/Entities'
import { ProjectStackParamList } from './ProjectNavigator'

export type HomeScreenNavigationProp = StackNavigationProp<
	ProjectStackParamList,
	'Home'
>

const Tab = createBottomTabNavigator()

export function Home() {
	const { name, project } = useProject()
	const [saved, setSaved] = useState(false)

	const navigation = useNavigation()

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: name,
			headerTitleAlign: 'center',
			headerRight: () => (
				<IconButton
					icon="content-save"
					onPress={() => saveProject(name, project).then(() => setSaved(true))}
				/>
			),
		})
	}, [navigation, project, name])

	return (
		<>
			<Tab.Navigator>
				<Tab.Screen
					name={upperCaseFirst(wTranslate('entities.title'))}
					component={Entities}
					options={{ tabBarIcon: () => <IconButton icon={'drawing-box'} /> }}
				/>
				<Tab.Screen
					name={upperCaseFirst(wTranslate('tests.title'))}
					component={Describes}
					options={{ tabBarIcon: () => <IconButton icon={'flask'} /> }}
				/>
			</Tab.Navigator>
			<Snackbar
				visible={saved}
				onDismiss={() => {
					setSaved(false)
				}}
				duration={2000}
				wrapperStyle={{ marginBottom: '20%' }}>
				{wTranslate('project.saved')}
			</Snackbar>
		</>
	)
}
