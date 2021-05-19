import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { DefinitionComponent } from "../components/Definition";
import { Module, Kind, fromJSON } from 'wollok-ts/dist/model'
import { Modal, Pressable, StyleSheet, View, Text, TextInput } from "react-native";
import { FAB, ToggleButton } from 'react-native-paper'




export function Definitions() {
    const theme = useTheme()
    const [definitions, setDefinitions] = useState<Module[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setNewDefintionName] = useState<string>('')
    const [kind, setKind] = useState<Kind>('Singleton')
    function fabPressed() {
        setModalVisible(true);
    }

    function addDefinition() {
        
        setDefinitions([...definitions, fromJSON({kind, name})])
    }

    return (
        <View style={{ flex: 1 }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput onChangeText={setNewDefintionName} placeholder="Nombre definicion"></TextInput>
                        <ToggleButton.Row
                            onValueChange={(value) => setKind(value as Kind)}
                            value={kind}>
                            <ToggleButton icon={()=><View><Text style={{color:'blue'}}>Objeto</Text></View>} value="Singleton" > 
                                <Text>Objeto</Text>
                            </ToggleButton>
                            <ToggleButton icon={()=><View><Text style={{color:'blue'}}>Clase</Text></View>} value="Class" > 
                                <Text>Clase</Text>
                            </ToggleButton>
                        </ToggleButton.Row>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                addDefinition()
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View>
                {definitions.map(def => <DefinitionComponent key={def.name} definition={def}></DefinitionComponent>)}
            </View>

            <FAB icon="plus" onPress={fabPressed} style={{ ...styles.fab, backgroundColor: theme.colors.primary }} />
        </View>
    )
}



const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 3,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});