import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { IconButton, Snackbar } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { RootStackParamList } from '../App'
import { ProjectHeader } from '../components/projects/ProjectHeader'
import { NodeNavigationProvider } from '../context/NodeNavigation'
import { useProject } from '../context/ProjectProvider'
import { wTranslate } from '../utils/translation-helpers'
import { Describes } from './tabs/Describes'
import { Modules } from './tabs/Modules'

export type HomeScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
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
			headerRight: () => (
				<NodeNavigationProvider>
					<ProjectHeader pushMessage={pushMessage} />
				</NodeNavigationProvider>
			),
		})
	}, [navigation, project, name])

	return (
		<>
			<Tab.Navigator>
				<Tab.Screen
					name={upperCaseFirst(wTranslate('entities.title'))}
					component={Modules}
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
