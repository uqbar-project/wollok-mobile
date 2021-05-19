import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { DefinitionComponent } from "../components/Definition";
import { Module, Kind, fromJSON } from 'wollok-ts/dist/model'
import { StyleSheet, View } from "react-native";
import { Modal, FAB, ToggleButton, Button, TextInput, Text, Portal } from 'react-native-paper'





export function Definitions() {
    const { colors } = useTheme()
    const [definitions, setDefinitions] = useState<Module[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setNewDefintionName] = useState<string>('')
    const [kind, setKind] = useState<Kind>('Singleton')
    function fabPressed() {
        setModalVisible(true);
    }

    function addDefinition() {

        setDefinitions([...definitions, fromJSON({ kind, name })])
    }

    function toggleButtonColorByKind(aKind: Kind){
        return kind == aKind ? 'grey' : undefined
    }

    return (
        <View style={{flex: 1}}>
            <Portal>
                <Modal
                    contentContainerStyle={{ padding: 20, backgroundColor: colors.background}}
                    visible={modalVisible}
                    onDismiss={() => setModalVisible(false)}
                >
                    <TextInput placeholderTextColor="grey" onChangeText={setNewDefintionName} placeholder="Nombre definicion"></TextInput>
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
                            addDefinition()
                            setModalVisible(!modalVisible)
                        }}
                    >
                        <Text>OK</Text>
                    </Button>
                </Modal>
            </Portal>
            <View>
                {definitions.map(def => <DefinitionComponent key={def.name} definition={def}></DefinitionComponent>)}
            </View>

            <FAB icon="plus" onPress={fabPressed} style={{ ...styles.fab, backgroundColor: colors.primary }} />
        </View>
    )
}



const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
});

