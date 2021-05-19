import React from 'react'
import { useTheme } from "@react-navigation/native";
import { Image, StyleProp, ViewStyle } from 'react-native';
import { List } from 'react-native-paper';
import { Module, Kind } from 'wollok-ts/dist/model';


export function DefinitionComponent(props: {definition: Module}) {
    const {colors} = useTheme()

    const itemStyle: StyleProp<ViewStyle> = {
        marginHorizontal: 4,
        borderRadius: 3,
        padding: 10,
        marginTop: 6,
        backgroundColor: colors.notification
    }
    return (
        <List.Item   
            key={props.definition.name}
            style= {itemStyle}
            titleStyle= {{color: 'black', fontSize: 20}}
            title={props.definition.name}
            left={() => <Image source={getImageFromType(props.definition.kind)} style={{marginRight: 10, alignSelf: 'center'}}/>}            
        />        
    )
}



function getImageFromType(aKind: Kind){
    switch(aKind){
        case "Class": 
            return require('../../assets/class.png')
        case "Singleton":
            return require('../../assets/wko.png')
        case "Mixin":
            return require('../../assets/mixin.png')
    }
}