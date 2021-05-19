import { Portal, ToggleButton, Modal, TextInput,  Text, Button } from "react-native-paper"
import { View } from "react-native"
import { Kind, fromJSON, Module } from "wollok-ts/dist/model"
import React, { useState } from "react"
import { useTheme } from "@react-navigation/native"

export function NewDefinitionModal(props: {
    visible: boolean, 
    setVisible: (value: boolean) => void, 
    addDefinition: (definition: Module) => void
}){
    console.log(props.visible)
    const {colors} = useTheme()
    const [name, setName] = useState<string>('')
    const [kind, setKind] = useState<Kind>('Singleton')

    
    function toggleButtonColorByKind(aKind: Kind) {
        return kind == aKind ? 'grey' : undefined
    }
   
    return (
        <Portal>
                <Modal
                    contentContainerStyle={{ padding: 20, backgroundColor: colors.background}}
                    visible={props.visible}
                    onDismiss={() => props.setVisible(false)}
                >
                    <TextInput placeholderTextColor="grey" onChangeText={setName} placeholder="Nombre definicion"></TextInput>
                    <ToggleButton.Row style={{ marginVertical: 15, alignSelf: 'center'}}
                        onValueChange={(value) => setKind(value as Kind)}
                        value={kind}>
                        <ToggleButton
                            style={{ width: 100, backgroundColor: toggleButtonColorByKind('Singleton') }}
                            icon={() => <View><Text>OBJETO</Text></View>}
                            value='Singleton'
                        />
                        <ToggleButton
                            style={{ width: 100, backgroundColor: toggleButtonColorByKind('Class') }}
                            icon={() => <View><Text>CLASE</Text></View>}
                            value='Class'
                        />
                        <ToggleButton
                            style={{ width: 100, backgroundColor: toggleButtonColorByKind('Mixin') }}
                            icon={() => <View><Text>MIXIN</Text></View>}
                            value='Mixin'
                        />

                    </ToggleButton.Row>
                    <Button
                        onPress={() => {
                            props.addDefinition(fromJSON({ kind, name }))
                            props.setVisible(false)
                        }}
                    >
                        <Text>OK</Text>
                    </Button>
                </Modal>
            </Portal>
    )

}