import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Visible } from '../../utils/type-helpers'
import FormModal from '../ui/FormModal/FormModal'

export function ProjectFormModal(
	props: Visible & {
		title: string
		onSubmit: (projectName: string) => void
		currentName?: string
	},
) {
	const [projectName, setProjectName] = useState<string | null>(null)
	return (
		<FormModal
			valid={projectName !== null && projectName !== ''}
			title={props.title}
			visible={props.visible}
			setVisible={props.setVisible}
			onSubmit={() => props.onSubmit(projectName!)}
			resetForm={() => setProjectName(null)}>
			<TextInput
				onChangeText={setProjectName}
				value={projectName === null ? props.currentName : projectName}
			/>
		</FormModal>
	)
}
