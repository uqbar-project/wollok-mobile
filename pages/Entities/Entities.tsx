import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { EntityComponent } from "../../components/entities/Entity/Entity";
import { Module } from 'wollok-ts/dist/model'
import { NewEntityModal } from "../../components/entities/NewEntityModal/NewEntityModal";
import { ScrollView } from "react-native-gesture-handler";
import { FabScreen } from "../../components/FabScreen";





export function Entities() {
    const [entities, setEntities] = useState<Module[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
  
    function fabPressed() {
        setModalVisible(true);
    }

    function addEntity(entity: Module) {
        setEntities([...entities, entity])
    }

    
    return (
        <FabScreen onPress={fabPressed}>
            <ScrollView>
                {entities.map(ent => <EntityComponent key={ent.name} entity={ent}/>)}
            </ScrollView>
            <NewEntityModal visible={modalVisible} addEntity={addEntity} setVisible={setModalVisible}/>
        </FabScreen>        
    )
}