import React, { useState } from 'react'
import { Badge, IconButton } from 'react-native-paper'
import Share from 'react-native-share'
import { useProject } from '../../context/ProjectProvider'
import { projectsFolderPath } from '../../services/persistance.service'
import ProblemModal from '../problems/ProblemsModal'
import { Row } from '../ui/Row'

interface ProjectHeaderProp {
	pushMessage: (tag: 'saved' | 'shared') => void
}

function ProjectHeader({ pushMessage }: ProjectHeaderProp) {
	const [showProblems, setShowProblems] = useState(false)
	const {
		name,
		changed,
		problems,
		actions: { save },
	} = useProject()

	const url = `${projectsFolderPath}/${name}.wlkm`

	return (
		<Row>
			<IconButton
				disabled={!problems.length}
				icon="alert-circle"
				onPress={() => {
					setShowProblems(true)
				}}
			/>
			<Badge>{problems.length}</Badge>
			<IconButton
				disabled={!changed}
				icon="content-save"
				onPress={() => save().then(() => pushMessage('saved'))}
			/>
			<IconButton
				icon="share"
				onPress={() =>
					Share.open({ url }).then((/** { message } */) =>
						pushMessage('shared'))
				}
			/>

			<ProblemModal
				problems={problems}
				visible={showProblems}
				setVisible={setShowProblems}
				onSelect={() => setShowProblems(false)}
			/>
		</Row>
	)
}

export default ProjectHeader
