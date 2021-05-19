import React from 'react'
import { useTheme } from "@react-navigation/native";
import { ListItem, Text } from "native-base";
import { Image } from 'react-native';
import { Module, Kind } from 'wollok-ts/dist/model';

export function DefinitionComponent(props: {definition: Module}) {
    const {colors} = useTheme()
    return (
        <ListItem   noIndent={true} style={{
            padding: 10,
            marginTop: 6,
            backgroundColor: colors.notification,
        }}>
            <Image source={getImageFromType(props.definition.kind)} style={{marginRight: 10}}></Image>
            <Text>{props.definition.name}</Text>
        </ListItem>
    )
}

function getImageFromType(aType: Kind){
    switch(aType){
        case "Class": 
            return require('../assets/class.png')
        case "Singleton":
            return require('../assets/wko.png')
        case "Mixin":
            throw Error('agrega la imagen pa')
        //     return require('../assets/mixin.png')
    }
}