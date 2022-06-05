import React, { useState } from 'react'
import { withTheme } from 'react-native-paper'
import { Module } from 'wollok-ts/dist/model'
import {
	useNodeNavigation,
	withNodeNavigation,
} from '../../../context/NodeNavigation'
import { useProject } from '../../../context/ProjectProvider'
import { Theme } from '../../../theme'
import { wTranslate } from '../../../utils/translation/translation-helpers'
import { ProblemReporterButton } from '../../problems/ProblemReporterButton'
import { TextFormModal } from '../../ui/FormModal/TextFormModal'
import { NamedListItem } from '../../ui/NamedListItem'
import { CommonOptionsDialog } from '../../ui/Options/CommonOptionsDialog'
import { optionsTitleFromName } from '../../ui/Options/OptionsDialog'
import { EntityKindIcon } from '../EntityKindIcon'

type EntityComponentProps = {
	entity: Module
	theme: Theme
}

function EntityComponent({ entity }: EntityComponentProps) {
	const {
		actions: { deleteEntity, editEntity },
	} = useProject()
	const [isOptionsVisible, setOptionsDialogVisible] = useState(false)
	const { goToNode } = useNodeNavigation()
	const goToEntityDetails = () => goToNode(entity)
	const [renameModal, setRenameModal] = useState(false)

	function onDelete() {
		deleteEntity(entity)
	}
	function onRename(newName: string) {
		editEntity(entity, entity.copy({ name: newName }))
	}

	return (
		<>
			<NamedListItem
				namedItem={entity}
				onPress={goToEntityDetails}
				key={entity.name}
				left={() => <EntityKindIcon kind={entity.kind} />}
				right={() => <ProblemReporterButton node={entity} />}
				onLongPress={() => setOptionsDialogVisible(true)}
			/>
			<CommonOptionsDialog
				title={optionsTitleFromName(entity.name!)}
				actions={{
					rename: () => setRenameModal(true),
					delete: onDelete,
				}}
				visible={isOptionsVisible}
				dismiss={() => setOptionsDialogVisible(false)}
			/>
			<TextFormModal
				onSubmit={onRename}
				setVisible={setRenameModal}
				visible={renameModal}
				title={wTranslate('abm.rename')}
				currentText={entity.name}
			/>
		</>
	)
}

export default withTheme(withNodeNavigation(EntityComponent))
