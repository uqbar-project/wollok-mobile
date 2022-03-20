import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { IconButton, Snackbar } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { ProjectHeader } from '../components/projects/ProjectHeader'
import { useProject } from '../context/ProjectProvider'
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
	// MOve to another component
	const [message, setMessage] = useState('')
	const [showMessage, setShowMessage] = useState(false)

	function pushMessage(tag: string) {
		setMessage(tag)
		setShowMessage(true)
	}

	const navigation = useNavigation()
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: name,
			headerTitleAlign: 'center',
			headerRight: () => <ProjectHeader pushMessage={pushMessage} />,
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
				visible={showMessage}
				onDismiss={() => {
					setShowMessage(false)
				}}
				duration={2000}
				wrapperStyle={{ marginBottom: '20%' }}>
				{wTranslate(`project.${message}`)}
			</Snackbar>
		</>
	)
}
