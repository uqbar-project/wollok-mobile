import { useTheme } from "@react-navigation/native";
import { Fab, Icon, List, View, Text, Input } from "native-base";
import React, { useState } from "react";
import { DefinitionComponent } from "../components/Definition";
import { Singleton, Module } from 'wollok-ts/dist/model'
import { Alert, Modal, Pressable, StyleSheet } from "react-native";


export function Definitions (){
    const theme = useTheme()
    const [definitions, setDefinitions] = useState<Module[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newDefintionName, setNewDefintionName] = useState<string>('')
    
    function fabPressed() {
        setModalVisible(true);
    }

    function addDefinition(){
        setDefinitions([...definitions, new Singleton({name: newDefintionName})])        
    }

    return (
        <View style={{flex: 1}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Input onChangeText={setNewDefintionName} placeholder="Nombre definicino"></Input>
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
            <List>
                {definitions.map(def => <DefinitionComponent key={def.name} definition={def}></DefinitionComponent>)}
            </List>

            <Fab onPress={fabPressed} style={{backgroundColor: theme.colors.primary}}>
                <Icon name='add'></Icon>                
            </Fab>
        </View>
    )
}

const styles = StyleSheet.create({
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
      borderRadius: 20,
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