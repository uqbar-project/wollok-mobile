import React, { useState } from 'react'
import { List, withTheme } from 'react-native-paper'
import { Module } from 'wollok-ts/dist/model'
import {
	useNodeNavigation,
	withNodeNavigation,
} from '../../../context/NodeNavigation'
import { useProject } from '../../../context/ProjectProvider'
import { Theme } from '../../../theme'
import { wTranslate } from '../../../utils/translation-helpers'
import { ProblemReporterButton } from '../../problems/ProblemReporterButton'
import { TextFormModal } from '../../ui/FormModal/TextFormModal'
import { OptionsDialog } from '../../ui/OptionsDialog'
import { EntityKindIcon } from '../EntityKindIcon'
import { stylesheet } from './styles'

type EntityComponentProps = {
	entity: Module
	theme: Theme
}

function EntityComponent({ entity, theme }: EntityComponentProps) {
	const styles = stylesheet(theme)
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
			<List.Item
				onPress={goToEntityDetails}
				key={entity.name}
				style={styles.item}
				titleStyle={styles.itemTitle}
				title={entity.name}
				left={() => <EntityKindIcon kind={entity.kind} />}
				right={() => <ProblemReporterButton node={entity} />}
				onLongPress={() => setOptionsDialogVisible(true)}
			/>
			<OptionsDialog
				title={wTranslate('abm.options')}
				options={[
					{ action: onDelete, title: wTranslate('abm.delete') },
					{
						action: () => setRenameModal(true),
						title: wTranslate('abm.rename'),
					},
				]}
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
