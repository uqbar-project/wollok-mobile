import React from "react";
import { Definitions } from "./pages/Definitions";
import  {theme}  from "./theme";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'


 const App = () => {
    const Stack = createStackNavigator();
    
    const paperTheme: ReactNativePaper.Theme = {
       ...DefaultTheme,
       colors: {
         ...DefaultTheme.colors,
         ...theme.colors,
         accent: theme.colors.border
       }
    }
    return (
       <PaperProvider theme= {paperTheme}>
         <NavigationContainer theme={theme}> 
            <Stack.Navigator>
                  <Stack.Screen 
                     name="definitions"
                     component={Definitions} 
                     options={{title: 'Definiciones', headerTitleAlign:'center'}}
                  ></Stack.Screen>
            </Stack.Navigator>
         </NavigationContainer>
       </PaperProvider>
    )
 };





 export default App;
