import React from "react";
import { Entities } from "./pages/Entities/Entities";
import { theme } from "./theme";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import { EntityDetails } from "./pages/EntityDetails/EntityDetails";
import { Module } from "wollok-ts/dist/model";

export type RootStackParamList = {
   Entities: undefined,
   EntityDetails: { entity: Module }
 }

const App = () => {
   const Stack = createStackNavigator<RootStackParamList>()

   const paperTheme: ReactNativePaper.Theme = {
      ...DefaultTheme,
      colors: {
         ...DefaultTheme.colors,
         ...theme.colors,
         accent: theme.colors.border
      }
   }
   return (
      <PaperProvider theme={paperTheme}>
         <NavigationContainer theme={theme}>
            <Stack.Navigator initialRouteName="Entities">
               <Stack.Screen
                  name="Entities"
                  component={Entities}
                  options={{ title: 'Entidades', headerTitleAlign: 'center' }}
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
};





export default App;
