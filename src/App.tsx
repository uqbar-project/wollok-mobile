import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import RNLocalize from 'react-native-localize'
import { Provider as PaperProvider } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Method, Module } from 'wollok-ts/dist/model'
import {
	ExpressionBackButton,
	ExpressionCheckButton,
	ExpressionOnSubmit,
} from './components/expressions/expression-header'
import { ExpressionProvider } from './context/ExpressionProvider'
import { ProjectProvider } from './context/ProjectProvider'
import { Entities } from './pages/Entities/Entities'
import EntityDetails from './pages/EntityDetails/EntityDetails'
import ExpressionMaker from './pages/ExpressionMaker/ExpressionMaker'
import { MethodDetail } from './pages/MethodDetail'
import { theme } from './theme'
import { setI18nConfig, translate } from './utils/translation-helpers'

export type RootStackParamList = {
	Entities: undefined
	EntityDetails: { entity: Module }
	ExpressionMaker: { onSubmit: ExpressionOnSubmit }
	MethodDetails: { method: Method }
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
			<ProjectProvider>
				<ExpressionProvider>
					<NavigationContainer theme={theme}>
						<Stack.Navigator screenOptions={{ headerStyle }} mode="modal">
							<Stack.Screen
								name="Entities"
								component={Entities}
								options={{
									title: upperCaseFirst(translate('entities.title')),
									headerTitleAlign: 'center',
								}}
							/>
							<Stack.Screen
								name="EntityDetails"
								component={EntityDetails}
								options={({ route }) => ({
									title: route.params.entity.name,
									headerTitleAlign: 'center',
									animationEnabled: false,
								})}
							/>
							<Stack.Screen
								name="MethodDetails"
								component={MethodDetail}
								options={({ route }) => ({
									//TODO: use label() instead of name
									title: route.params.method.name,
								})}
							/>
							<Stack.Screen
								name="ExpressionMaker"
								component={ExpressionMaker}
								options={({ route }) => ({
									title: translate('expression.title'),
									headerTitleAlign: 'center',
									animationEnabled: false,
									headerLeft: () => <ExpressionBackButton />,
									headerRight: () => (
										<ExpressionCheckButton onSubmit={route.params.onSubmit} />
									),
								})}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</ExpressionProvider>
			</ProjectProvider>
		</PaperProvider>
	)
}

const headerStyle = { elevation: 0, shadowOpacity: 0 }

export default App
