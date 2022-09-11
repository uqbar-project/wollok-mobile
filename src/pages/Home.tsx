import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { IconButton, Snackbar } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { RootStackParamList } from '../App'
import ProjectHeader, { MessageTag } from '../components/projects/ProjectHeader'
import { useProject } from '../context/ProjectProvider'
import { wTranslate } from '../utils/translation/translation-helpers'
import { Describes } from './tabs/Describes'
import { Modules } from './tabs/Modules'

export type HomeScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Home'
>

const Tab = createBottomTabNavigator()

export function Home() {
	const { name, project, changed } = useProject()

	// Move to another component
	const [message, setMessage] = useState<MessageTag | null>(null)

	const navigation = useNavigation()
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: name,
			headerTitleAlign: 'center',
			headerRight: () => <ProjectHeader pushMessage={setMessage} />,
		})
	}, [navigation, project, name])

	useEffect(() => {
		navigation.removeListener('beforeRemove', _ => {})
		navigation.addListener('beforeRemove', e => {
			if (!changed) {
				return
			}
			e.preventDefault()
			Alert.alert(
				wTranslate('home.unsavedChanges'),
				wTranslate('home.youWillLoseThem'),
				[
					{ text: wTranslate('cancel'), style: 'cancel', onPress: () => {} },
					{
						text: wTranslate('discard'),
						style: 'destructive',
						onPress: () => navigation.dispatch(e.data.action),
					},
				],
			)
		})
	}, [navigation, changed])

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
				visible={message !== null}
				onDismiss={() => setMessage(null)}
				duration={2000}
				wrapperStyle={{ marginBottom: '20%' }}>
				{wTranslate(`project.${message!}`)}
			</Snackbar>
		</>
	)
}
