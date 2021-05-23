import { Portal, Modal, TextInput,  Text, Button } from "react-native-paper"
import { Kind, fromJSON, Module } from "wollok-ts/dist/model"
import React, { useState } from "react"
import { useTheme } from "@react-navigation/native"
import { SelectKind } from "./SelectKind"

export function NewEntityModal(props: {
    visible: boolean, 
    setVisible: (value: boolean) => void, 
    addEntity: (definition: Module) => void
}){
    const {colors} = useTheme()
    const [name, setName] = useState<string>('')
    const [kind, setKind] = useState<Kind>('Singleton')

    
   
    return (
        <Portal>
                <Modal
                    contentContainerStyle={{ padding: 20, backgroundColor: colors.background}}
                    visible={props.visible}
                    onDismiss={() => props.setVisible(false)}
                >
                    <TextInput placeholderTextColor="grey" onChangeText={setName} placeholder="Nombre definicion"></TextInput>
                    
                    <SelectKind kind={kind} setKind={setKind}/>

                    <Button
                        onPress={() => {
                            props.addEntity(fromJSON({ kind, name }))
                            setName('')
                            setKind('Singleton')
                            props.setVisible(false)
                        }}
                    >
                        <Text>OK</Text>
                    </Button>
                </Modal>
            </Portal>
    )

}