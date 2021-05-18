import React from 'react'
import { useTheme } from "@react-navigation/native";
import { ListItem, Text } from "native-base";
import { Image } from 'react-native';

export type Definition = {
    name: string,
    difinitionType: 'object' | 'class' 
}

export function DefinitionComponent(props: {definition: Definition}) {
    const {colors} = useTheme()
    return (
        <ListItem   noIndent={true} style={{
            padding: 10,
            marginTop: 6,
            backgroundColor: colors.notification,
        }}>
            <Image source={getImageFromType(props.definition.difinitionType)} style={{marginRight: 10}}></Image>
            <Text>{props.definition.name}</Text>
        </ListItem>
    )
}

function getImageFromType(aType: string){
    switch(aType){
        case "class": 
            return require('../assets/class.png')
        case "object":
            return require('../assets/wko.png')
    }
}