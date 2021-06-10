import { Text, List, Divider } from 'react-native-paper'
import React, { useState } from "react";
import { FabAddScreen } from "../../components/FabScreen";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';



export function EntityDetails(props: { route: RouteProp<RootStackParamList, 'EntityDetails'> }) {
    console.log(props.route.params.entity.methods())
    return (
        <FabAddScreen onPress={() => console.log('hola')}>
            <List.Section>
                <List.Accordion
                    title="ATRIBUTOS"
                > 
                    <List.Item title="First item" />
                    <Divider style={{ marginHorizontal: 10, backgroundColor: 'white' }} />
                    <List.Item title="Second item" />
                </List.Accordion> 


                <List.Accordion
                    title="METODOS"
                > 
                    <List.Item title="First item" />
                    <Divider style={{ marginHorizontal: 10, backgroundColor: 'white' }} />
                    <List.Item title="Second item" />
                </List.Accordion> 
            </List.Section>
        </FabAddScreen>
    )
}