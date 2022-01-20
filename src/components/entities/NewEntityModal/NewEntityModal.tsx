import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Class, Kind, Mixin, Module, Singleton } from 'wollok-ts/dist/model'
import { translate } from '../../../utils/translation-helpers'
import FormModal from '../../ui/FormModal/FormModal'
import { SelectKind } from '../SelectKind/SelectKind'

const initialName: string = ''
const initialKind: Kind = 'Singleton'

function NewEntityModal(props: {
	visible: boolean
	setVisible: (value: boolean) => void
	addEntity: (entity: Module) => void
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
				placeholder={translate('entities.entityName')}
			/>
			<SelectKind kind={kind} setKind={setKind} />
		</FormModal>
	)
	function addEntity() {
		var entity: Module
		switch (kind) {
			case 'Singleton':
				entity = new Singleton({ name })
				break
			case 'Class':
				entity = new Class({ name })
				break
			case 'Mixin':
				entity = new Mixin({ name })
				break
			default:
				throw `Not supported kind ${kind}`
		}
		props.addEntity(entity)
	}

	function resetForm() {
		setName(initialName)
		setKind(initialKind)
	}
}

export default NewEntityModal
