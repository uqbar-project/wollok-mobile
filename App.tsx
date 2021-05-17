import React from "react";
import { Definitions } from "./pages/Definitions";
import  {theme}  from "./theme";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";



 const App = () => {
    const Stack = createStackNavigator();
    
    return (
       <NavigationContainer theme={theme}> 
           <Stack.Navigator>
               <Stack.Screen 
                  name="definitions"
                  component={Definitions} 
                  options={{title: 'Definiciones', headerTitleAlign:'center'}}
               ></Stack.Screen>
           </Stack.Navigator>
       </NavigationContainer>
    )
 };





 export default App;
