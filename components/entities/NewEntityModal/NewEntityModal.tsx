import React, { useState } from 'react'
import {
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
  withTheme,
} from 'react-native-paper'
import { Entity, Kind } from '../../../models/entity'
import { Theme } from '../../../theme'
import { translate } from '../../../utils/translation-helpers'
import { SelectKind } from '../SelectKind/SelectKind'
import { stylesheet } from './styles'

function NewEntityModal(props: {
  visible: boolean
  setVisible: (value: boolean) => void
  addEntity: (definition: Entity) => void
  theme: Theme
}) {
  const styles = stylesheet(props.theme)
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
        onDismiss={() => props.setVisible(false)}>
        <TextInput
          placeholderTextColor="grey"
          onChangeText={setName}
          placeholder={translate('entities.entityName')}></TextInput>

        <SelectKind kind={entity.kind} setKind={setKind} />

        <Button
          onPress={() => {
            props.addEntity(entity)
            setEntity(getEmptyEntity())
            props.setVisible(false)
          }}>
          <Text>{translate('ok').toUpperCase()}</Text>
        </Button>
      </Modal>
    </Portal>
  )
}

function getEmptyEntity(): Entity {
  return new Entity('', 'Singleton')
}

export default withTheme(NewEntityModal)
