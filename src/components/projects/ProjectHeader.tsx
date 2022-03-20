import React from 'react'
import { IconButton } from 'react-native-paper'
import { useProject } from '../../context/ProjectProvider'

interface ProjectHeaderProp {
	pushMessage: (tag: string) => void
}

export function ProjectHeader({ pushMessage }: ProjectHeaderProp) {
	const {
		changed,
		actions: { save },
	} = useProject()

	return (
		<>
			<IconButton
				disabled={!changed}
				icon="content-save"
				onPress={() => save().then(() => pushMessage('saved'))}
			/>
		</>
	)
}
