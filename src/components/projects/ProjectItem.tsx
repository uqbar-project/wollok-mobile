import React, { useState } from 'react'
import {
	deleteProject,
	renameProject,
} from '../../services/persistance.service'
import { wTranslate } from '../../utils/translation/translation-helpers'
import { TextFormModal } from '../ui/FormModal/TextFormModal'
import { NamedListItem } from '../ui/NamedListItem'
import { CommonOptionsDialog } from '../ui/Options/CommonOptionsDialog'
import { optionsTitleFromName } from '../ui/Options/OptionsDialog'

export const ProjectItem = (props: {
	project: string
	navigateToProject: (project: string) => void
	onDelete: (project: string) => void
	onRename: (project: string) => void
}) => {
	const [showOptions, setShowOptions] = useState(false)
	const [showRename, setShowRename] = useState(false)

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
			<NamedListItem
				onPress={() => props.navigateToProject(props.project)}
				namedItem={{ name: props.project }}
				onLongPress={() => setShowOptions(true)}
			/>
			<CommonOptionsDialog
				title={optionsTitleFromName(props.project)}
				visible={showOptions}
				dismiss={() => setShowOptions(false)}
				actions={{
					delete: onDeleteProject,
					rename: () => setShowRename(true),
				}}
			/>
			<TextFormModal
				title={wTranslate('abm.rename')}
				onSubmit={onRenameProject}
				setVisible={setShowRename}
				visible={showRename}
				currentText={props.project}
			/>
		</>
	)
}
