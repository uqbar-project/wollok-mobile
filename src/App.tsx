import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import RNLocalize from 'react-native-localize'
import { Provider as PaperProvider } from 'react-native-paper'
import { Environment } from 'wollok-ts/dist/model'
import { ProjectNavigator } from './pages/ProjectNavigator'
import { SelectProject } from './pages/SelectProject'
import { createPersistanceFolder } from './services/persistance.service'
import { theme } from './theme'
import { setI18nConfig, wTranslate } from './utils/translation-helpers'
import './weak-ref/WeakRef'

export type RootStackParamList = {
	SelectProject: undefined
	ProjectNavigator: { name: string; project: Environment }
}

const Stack = createStackNavigator<RootStackParamList>()

const App = () => {
	setI18nConfig()
	useEffect(() => {
		RNLocalize.addEventListener('change', setI18nConfig)

		createPersistanceFolder()

		return function cleanup() {
			RNLocalize.removeEventListener('change', setI18nConfig)
		}
	})

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer theme={theme}>
				<Stack.Navigator>
					<Stack.Screen
						name="SelectProject"
						component={SelectProject}
						options={{ title: wTranslate('project.selectProject') }}
					/>
					<Stack.Screen
						name="ProjectNavigator"
						component={ProjectNavigator}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	)
}

export default App
