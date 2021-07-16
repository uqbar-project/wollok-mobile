import { Portal, Modal, TextInput, Text, Button } from "react-native-paper"
import { fromJSON } from "wollok-ts/dist/model"
import React, { useState } from "react"
import { useTheme } from "@react-navigation/native"
import { SelectKind } from "../SelectKind/SelectKind"
import { stylesheet } from "./styles"
import { translate } from "../../../utils/translation-helpers"
import { Kind, Entity } from "../../../models/entity"


export function NewEntityModal(props: {
    visible: boolean,
    setVisible: (value: boolean) => void,
    addEntity: (definition: Entity) => void
}) {
    const styles = stylesheet(useTheme())
    const [entity, setEntity] = useState<Entity>(getEmptyEntity())

    function setName(name: string) {
        setEntity({ ...entity, name })
    }

    function setKind(kind: Kind) {
        setEntity({ ...entity, kind })
    }


    return (
        <Portal>
            <Modal
                contentContainerStyle={styles.modal}
                visible={props.visible}
                onDismiss={() => props.setVisible(false)}
            >
                <TextInput placeholderTextColor="grey" onChangeText={setName} placeholder={translate('entities.entityName')}></TextInput>

                <SelectKind kind={entity.kind} setKind={setKind} />

                <Button
                    onPress={() => {
                        props.addEntity(fromJSON(entity))
                        setEntity(getEmptyEntity())
                        props.setVisible(false)
                    }}
                >
                    <Text>{translate('ok').toUpperCase()}</Text>
                </Button>
            </Modal>
        </Portal>
    )

}

function getEmptyEntity(): Entity {
    return new Entity('', 'Singleton')
}