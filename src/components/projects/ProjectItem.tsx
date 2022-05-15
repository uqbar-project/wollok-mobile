import React, { useState } from 'react'
import { List } from 'react-native-paper'
import {
	deleteProject,
	renameProject,
} from '../../services/persistance.service'
import { useTheme } from '../../theme'
import { wTranslate } from '../../utils/translation-helpers'
import { stylesheet } from '../entities/Entity/styles'
import { OptionsDialog } from '../ui/OptionsDialog'
import { ProjectFormModal } from './ProjectFormModal'

export const ProjectItem = (props: {
	project: string
	navigateToProject: (project: string) => void
	onDelete: (project: string) => void
	onRename: (project: string) => void
}) => {
	const [showOptions, setShowOptions] = useState(false)
	const [showRename, setShowRename] = useState(false)

	const styles = stylesheet(useTheme())

	async function onDeleteProject() {
		await deleteProject(props.project)
		setShowOptions(false)
		props.onDelete(props.project)
	}

	async function onRenameProject(newName: string) {
		await renameProject(props.project, newName)
		setShowOptions(false)
		props.onRename(props.project)
	}

	return (
		<>
			<List.Item
				onPress={() => props.navigateToProject(props.project)}
				title={props.project}
				style={styles.item}
				titleStyle={styles.itemTitle}
				onLongPress={() => setShowOptions(true)}
			/>
			<OptionsDialog
				title={wTranslate('abm.options')}
				visible={showOptions}
				dismiss={() => setShowOptions(false)}
				options={[
					{
						action: onDeleteProject,
						title: wTranslate('abm.delete'),
					},
					{
						action: () => setShowRename(true),
						title: wTranslate('abm.rename'),
					},
				]}
			/>
			<ProjectFormModal
				title={wTranslate('project.rename')}
				onSubmit={onRenameProject}
				setVisible={setShowRename}
				visible={showRename}
				currentName={props.project}
			/>
		</>
	)
}
