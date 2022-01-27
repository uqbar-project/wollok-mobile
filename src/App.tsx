import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import RNLocalize from 'react-native-localize'
import { Provider as PaperProvider } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Name } from 'wollok-ts/dist/model'
import { ProjectProvider } from './context/ProjectProvider'
import EntityStack from './pages/EntityStack'
import { Home } from './pages/Home'
import { theme } from './theme'
import { setI18nConfig, wTranslate } from './utils/translation-helpers'

export type RootStackParamList = {
	Home: undefined
	EntityStack: { entityFQN: Name }
}

export const Stack = createStackNavigator<RootStackParamList>()

const App = () => {
	setI18nConfig()
	useEffect(() => {
		RNLocalize.addEventListener('change', setI18nConfig)

		return function cleanup() {
			RNLocalize.removeEventListener('change', setI18nConfig)
		}
	})

	return (
		<PaperProvider theme={theme}>
			<ProjectProvider>
				<NavigationContainer theme={theme}>
					<Stack.Navigator screenOptions={{ headerStyle }} mode="modal">
						<Stack.Screen
							name="Home"
							component={Home}
							options={{
								title: upperCaseFirst(wTranslate('project.title')),
								headerTitleAlign: 'center',
							}}
						/>
						<Stack.Screen
							name="EntityStack"
							component={EntityStack}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ProjectProvider>
		</PaperProvider>
	)
}

const headerStyle = { elevation: 0, shadowOpacity: 0 }

export default App
