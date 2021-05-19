import React from 'react'
import { useTheme } from "@react-navigation/native";
import { Image, View, Text } from 'react-native';
import { Module, Kind } from 'wollok-ts/dist/model';


export function DefinitionComponent(props: {definition: Module}) {
    const {colors} = useTheme()
    return (
        <View   style={{
            marginHorizontal: 4,
            borderRadius: 3,
            padding: 10,
            marginTop: 6,
            backgroundColor: colors.notification,
        }}>
            <Image source={getImageFromType(props.definition.kind)} style={{marginRight: 10}}></Image>
            <Text>{props.definition.name}</Text>
        </View>
    )
}

function getImageFromType(aType: Kind){
    switch(aType){
        case "Class": 
            return require('../assets/class.png')
        case "Singleton":
            return require('../assets/wko.png')
        case "Mixin":
            return require('../assets/mixin.png')
    }
}