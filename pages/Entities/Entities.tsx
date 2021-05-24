import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { EntityComponent } from "../../components/entities/Entity/Entity";
import { Module } from 'wollok-ts/dist/model'
import { View } from "react-native";
import { FAB } from 'react-native-paper'
import { NewEntityModal } from "../../components/entities/NewEntityModal/NewEntityModal";
import { ScrollView } from "react-native-gesture-handler";
import { stylesheet } from "./styles";





export function Entities() {
    const styles = stylesheet(useTheme())
    const [entities, setEntities] = useState<Module[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
  
    function fabPressed() {
        setModalVisible(true);
    }

    function addEntity(entity: Module) {
        setEntities([...entities, entity])
    }

    
    return (
        <View style={{flex: 1}}>            
            <ScrollView>
                {entities.map(ent => <EntityComponent key={ent.name} entity={ent}/>)}
            </ScrollView>
            <NewEntityModal visible={modalVisible} addEntity={addEntity} setVisible={setModalVisible}/>
            <FAB icon="plus" onPress={fabPressed} style={ styles.fab } />
        </View>
    )
}