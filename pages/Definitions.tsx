import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { DefinitionComponent } from "../components/definitions/Definition";
import { Module } from 'wollok-ts/dist/model'
import { StyleSheet, View } from "react-native";
import { FAB } from 'react-native-paper'
import { NewDefinitionModal } from "../components/definitions/NewDefinitionModal";





export function Definitions() {
    const { colors } = useTheme()
    const [definitions, setDefinitions] = useState<Module[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
  
    function fabPressed() {
        setModalVisible(true);
    }

    function addDefinition(definition: Module) {
        setDefinitions([...definitions, definition])
    }

    
    return (
        <View style={{flex: 1}}>            
            <View>
                {definitions.map(def => <DefinitionComponent key={def.name} definition={def}></DefinitionComponent>)}
            </View>
            <NewDefinitionModal visible={modalVisible} addDefinition={addDefinition} setVisible={setModalVisible}/>
            <FAB icon="plus" onPress={fabPressed} style={{ ...styles.fab, backgroundColor: colors.primary }} />
        </View>
    )
}



const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 30,
        right: 0,
        bottom: 0,
    }
});

