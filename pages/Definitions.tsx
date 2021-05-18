import { useTheme } from "@react-navigation/native";
import { Fab, Header, Icon, List, Text, View } from "native-base";
import React from "react";
import { DefinitionComponent, Definition } from "../components/Definition";

export function Definitions (){
    const theme = useTheme()
    return (
        <View style={{flex: 1}}>
            <List>
                {getDefinitions().map(def => <DefinitionComponent key={def.name} definition={def}></DefinitionComponent>)}
            </List>

            <Fab style={{backgroundColor: theme.colors.primary}}>
                <Icon name='add'></Icon>                
            </Fab>
        </View>
    )
}

function getDefinitions(): Definition[]{
    return [
        {name: 'pepita', difinitionType:'object'},
        {name: 'alpiste', difinitionType:'object'},
        {name: 'Entrenador', difinitionType: 'class'}
    ]
}