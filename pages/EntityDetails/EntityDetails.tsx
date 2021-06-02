import { Text } from 'react-native-paper'
import React from "react";
import { FabAddScreen } from "../../components/FabScreen";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';



export function EntityDetails(props: {route: RouteProp<RootStackParamList, 'EntityDetails'>}){
    return(
        <FabAddScreen onPress={() => console.log('hola')}>
            <Text>{props.route.params.entity.name}</Text>
        </FabAddScreen>
    )
}