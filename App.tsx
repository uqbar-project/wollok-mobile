import React, { useEffect } from "react"
import { Entities } from "./pages/Entities/Entities"
import { theme } from "./theme"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import { EntityDetails } from "./pages/EntityDetails/EntityDetails";
import { Module } from "wollok-ts/dist/model";

export type RootStackParamList = {
   Entities: undefined,
   EntityDetails: { entity: Module }
 }

import { setI18nConfig, translate } from "./utils/translation-helpers"
import RNLocalize from 'react-native-localize'
import { upperCaseFirst } from 'upper-case-first'

const App = () => {
   setI18nConfig()
   useEffect(() => {
      RNLocalize.addEventListener("change", setI18nConfig)

      return function cleanup(){
         RNLocalize.removeEventListener("change", setI18nConfig)
      }
   })

   const Stack = createStackNavigator<RootStackParamList>()
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
                  name="Entities"
                  component={Entities}
                  options={{ title: upperCaseFirst(translate("entities.title")), headerTitleAlign: 'center' }}
               ></Stack.Screen>
               <Stack.Screen
                  name="EntityDetails"
                  component={EntityDetails}
                  options={({route}) => ({ title: route.params.entity.name, headerTitleAlign: 'center', animationEnabled: false })}
               ></Stack.Screen>
            </Stack.Navigator>
         </NavigationContainer>
      </PaperProvider>
   )
}

const headerStyle = { elevation: 0, shadowOpacity: 0 }


export default App