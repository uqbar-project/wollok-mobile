import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import RNLocalize from 'react-native-localize'
import { Provider as PaperProvider } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Entity } from './models/entity'
import { Entities } from './pages/Entities/Entities'
import EntityDetails from './pages/EntityDetails/EntityDetails'
import { theme } from './theme'
import { setI18nConfig, translate } from './utils/translation-helpers'

export type RootStackParamList = {
	Entities: undefined
	EntityDetails: { entity: Entity }
}

const App = () => {
	setI18nConfig()
	useEffect(() => {
		RNLocalize.addEventListener('change', setI18nConfig)

		return function cleanup() {
			RNLocalize.removeEventListener('change', setI18nConfig)
		}
	})

	const Stack = createStackNavigator<RootStackParamList>()

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer theme={theme}>
				<Stack.Navigator screenOptions={{ headerStyle }}>
					<Stack.Screen
						name="Entities"
						component={Entities}
						options={{
							title: upperCaseFirst(translate('entities.title')),
							headerTitleAlign: 'center',
						}}></Stack.Screen>
					<Stack.Screen
						name="EntityDetails"
						component={EntityDetails}
						options={({ route }) => ({
							title: route.params.entity.name,
							headerTitleAlign: 'center',
							animationEnabled: false,
						})}></Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	)
}

const headerStyle = { elevation: 0, shadowOpacity: 0 }

export default App
