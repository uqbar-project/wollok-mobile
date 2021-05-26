import React from "react"
import { Entities } from "./pages/Entities/Entities"
import { theme } from "./theme"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import { setI18nConfig, translate } from "./utils/translation-helpers"
import RNLocalize from 'react-native-localize'
import { upperCaseFirst } from 'upper-case-first'

export default class App extends React.Component {

   constructor(props: {} | Readonly<{}>) {
      super(props)
      setI18nConfig()
   }

   componentDidMount() {
      RNLocalize.addEventListener("change", this.handleLocalizationChange)
   }

   componentWillUnmount() {
      RNLocalize.removeEventListener("change", this.handleLocalizationChange)
   }

   handleLocalizationChange = () => {
      setI18nConfig()
      this.forceUpdate()
   }



   render() {
      const Stack = createStackNavigator()
      const paperTheme: ReactNativePaper.Theme = {
         ...DefaultTheme,
         colors: {
            ...DefaultTheme.colors,
            ...theme.colors,
            accent: theme.colors.border
         },
         dark: theme.dark
      }
      return (
         <PaperProvider theme={paperTheme}>
            <NavigationContainer theme={theme}>
               <Stack.Navigator screenOptions={{ headerStyle }}>
                  <Stack.Screen
                     name="entities"
                     component={Entities}
                     options={{ title: upperCaseFirst(translate("entities.title")), headerTitleAlign: 'center' }}
                  ></Stack.Screen>
               </Stack.Navigator>
            </NavigationContainer>
         </PaperProvider>
      )
   }
}

const headerStyle = { elevation: 0, shadowOpacity: 0 }
