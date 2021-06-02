import { Text } from 'react-native-paper'
import React from "react";
import { FabScreen } from "../../components/FabScreen";

export function EntityDetails(){
    return(
        <FabScreen onPress={() => console.log('hola')}>
            <Text>Hola</Text>
        </FabScreen>
    )
}