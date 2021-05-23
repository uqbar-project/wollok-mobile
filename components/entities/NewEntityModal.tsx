import { Portal, Modal, TextInput,  Text, Button } from "react-native-paper"
import { Kind, fromJSON, Module } from "wollok-ts/dist/model"
import React, { useState } from "react"
import { useTheme } from "@react-navigation/native"
import { SelectKind } from "./SelectKind"

type Entity = {
    name: string,
    kind: Kind
}

export function NewEntityModal(props: {
    visible: boolean, 
    setVisible: (value: boolean) => void, 
    addEntity: (definition: Module) => void
}){
    const {colors} = useTheme()
    const [entity, setEntity] = useState<Entity>(getEmptyEntity())

    function setName(name: string){
        setEntity({...entity, name})
    }

    function setKind(kind: Kind){
        setEntity({...entity, kind})
    }
    
   
    return (
        <Portal>
                <Modal
                    contentContainerStyle={{ padding: 20, backgroundColor: colors.background}}
                    visible={props.visible}
                    onDismiss={() => props.setVisible(false)}
                >
                    <TextInput placeholderTextColor="grey" onChangeText={setName} placeholder="Nombre definicion"></TextInput>
                    
                    <SelectKind kind={entity.kind} setKind={setKind}/>

                    <Button
                        onPress={() => {
                            props.addEntity(fromJSON(entity))
                            setEntity(getEmptyEntity())
                            props.setVisible(false)
                        }}
                    >
                        <Text>OK</Text>
                    </Button>
                </Modal>
            </Portal>
    )

}

function getEmptyEntity(): Entity{
    return {
        kind: 'Singleton',
        name: ''
    }
}