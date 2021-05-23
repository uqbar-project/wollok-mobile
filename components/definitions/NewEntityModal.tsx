import { Portal, ToggleButton, Modal, TextInput,  Text, Button } from "react-native-paper"
import { View } from "react-native"
import { Kind, fromJSON, Module } from "wollok-ts/dist/model"
import React, { useState } from "react"
import { useTheme } from "@react-navigation/native"

const entityKinds: {kind: Kind, description: string}[] = 
    [
        {kind:'Singleton', description: 'OBJETO'},
        {kind:'Class', description: 'CLASE'},  
        {kind: 'Mixin', description: 'MIXIN'}
    ]

export function NewEntityModal(props: {
    visible: boolean, 
    setVisible: (value: boolean) => void, 
    addEntity: (definition: Module) => void
}){
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
                        {entityKinds.map(aKind => {
                            return (
                                <ToggleButton
                                    key={aKind.kind}
                                    style={{ width: 100, backgroundColor: toggleButtonColorByKind(aKind.kind) }}
                                    icon={() => <View><Text>{aKind.description}</Text></View>}
                                    value={aKind.kind}
                                />
                            )
                        })}
                    </ToggleButton.Row>
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