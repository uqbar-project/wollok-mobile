import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { wTranslate } from '../../utils/translation-helpers'
import FormModal from '../ui/FormModal/FormModal'

export function NewProjectModal(props: {
	onSubmit: (projectName: string) => void
	visible: boolean
	setVisible: (val: boolean) => void
}) {
	const [projectName, setProjectName] = useState('')
	return (
		<FormModal
			title={wTranslate('project.newProject')}
			visible={props.visible}
			setVisible={props.setVisible}
			onSubmit={() => props.onSubmit(projectName)}
			resetForm={() => setProjectName('')}>
			<TextInput onChangeText={setProjectName} value={projectName} />
		</FormModal>
	)
}
