import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Entity, Kind } from '../../../models/entity'
import { translate } from '../../../utils/translation-helpers'
import FormModal from '../../ui/FormModal/FormModal'
import { SelectKind } from '../SelectKind/SelectKind'


const initialName: string =  ''
const initialKind: Kind =  'Singleton'

function NewEntityModal(props: {
	visible: boolean
	setVisible: (value: boolean) => void
	addEntity: (definition: Entity) => void
}) {
	const [kind, setKind] = useState<Kind>(initialKind)
	const [name, setName] = useState<string>(initialName)

	return (
		<FormModal
			onSubmit={addEntity}
			resetForm={() => resetForm}
			setVisible={props.setVisible}
			visible={props.visible}>
			<TextInput
				onChangeText={setName}
				placeholder={translate('entities.entityName')}></TextInput>
			<SelectKind kind={kind} setKind={setKind} />
		</FormModal>
	)
	function addEntity() {
		props.addEntity(new Entity(name, kind))
	}

	function resetForm() {
		setName(initialName)
		setKind(initialKind)
	}
}

export default NewEntityModal
