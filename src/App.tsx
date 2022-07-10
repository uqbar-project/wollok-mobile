import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import RNLocalize from 'react-native-localize'
import { Provider as PaperProvider } from 'react-native-paper'
import {
	Environment,
	Expression,
	Method,
	Name,
	Send,
} from 'wollok-ts/dist/model'
import { templateProject } from './context/initialProject'
import { ProjectProvider } from './context/ProjectProvider'
import { ArgumentsMaker } from './pages/ArgumentsMaker'
import Debugger from './pages/Debugger'
import Editor from './pages/Editor'
import EntityDetails from './pages/EntityDetails'
import ExpressionMaker, { ExpressionOnSubmit } from './pages/ExpressionMaker'
import { Home } from './pages/Home'
import { SelectProject } from './pages/SelectProject'
import { createPersistanceFolder } from './services/persistance.service'
import { theme } from './theme'
import {
	setI18nConfig,
	wTranslate,
} from './utils/translation/translation-helpers'
import './weak-ref/WeakRef'

export type RootStackParamList = {
	SelectProject: undefined
	ProjectNavigator: { name: string; project: Environment }
	Home: undefined
	EntityDetails: { entityFQN: Name }
	Editor: { fqn: Name }
	Debugger: { fqn: Name }
	ExpressionMaker: {
		onSubmit: ExpressionOnSubmit
		contextFQN: Name
		initialExpression?: Expression
	}
	ArgumentsMaker: {
		receiver: Expression
		method: Method
		contextFQN: Name
		onSubmit: (s: Send) => void
	}
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
		<GestureHandlerRootView style={{ flex: 1 }}>
			<PaperProvider theme={theme}>
				<NavigationContainer theme={theme}>
					<ProjectProvider // Starts with a DummyProject until project selection
						projectName={''}
						initialProject={templateProject()}>
						<Stack.Navigator>
							<Stack.Screen
								name="SelectProject"
								component={SelectProject}
								options={{ title: wTranslate('project.selectProject') }}
							/>
							<Stack.Screen name="Home" component={Home} />
							<Stack.Screen name="EntityDetails" component={EntityDetails} />
							<Stack.Screen name="Editor" component={Editor} />
							<Stack.Screen name="Debugger" component={Debugger} />
							<Stack.Screen
								name="ExpressionMaker"
								component={ExpressionMaker}
							/>
							<Stack.Screen name="ArgumentsMaker" component={ArgumentsMaker} />
						</Stack.Navigator>
					</ProjectProvider>
				</NavigationContainer>
			</PaperProvider>
		</GestureHandlerRootView>
	)
}

export default App
