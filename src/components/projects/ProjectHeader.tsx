import React, { useState } from 'react'
import { Badge, IconButton } from 'react-native-paper'
import { Node } from 'wollok-ts/dist/model'
import { useNodeNavigation } from '../../context/NodeNavigation'
import { useProject } from '../../context/ProjectProvider'
import { ProblemModal } from '../problems/ProblemsModal'
import { Row } from '../ui/Row'

interface ProjectHeaderProp {
	pushMessage: (tag: string) => void
}

export function ProjectHeader({ pushMessage }: ProjectHeaderProp) {
	const [showProblems, setShowProblems] = useState(false)
	const {
		changed,
		problems,
		actions: { save },
	} = useProject()

	const { goToNode } = useNodeNavigation()

	const goto = (n: Node): void => {
		goToNode(n)
		setShowProblems(false)
	}

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

			<ProblemModal
				problems={problems}
				visible={showProblems}
				setVisible={setShowProblems}
				onSelect={p => goto(p.node)}
			/>
		</Row>
	)
}
