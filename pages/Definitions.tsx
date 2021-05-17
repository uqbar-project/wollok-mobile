import { useTheme } from "@react-navigation/native";
import { Fab, Header, Icon, List, Text, View } from "native-base";
import React from "react";
import { Definition } from "../components/Definition";

export function Definitions (){
    const theme = useTheme()
    return (
        <View style={{flex: 1}}>
            {getDefinitions().map(def => <Definition key={def.name} name={def.name}></Definition>)}

            <Fab style={{backgroundColor: theme.colors.primary}}>
                <Icon name='add'></Icon>                
            </Fab>
        </View>
    )
}

function getDefinitions(){
    return [
        {name: 'pepita'},
        {name: 'alpiste'}
    ]
}