import React, { useState } from 'react'
import { Node } from 'wollok-ts'
import { useProject } from '../../context/ProjectProvider'
import { ProblemIcon } from './ProblemIcon'
import { ProblemModal } from './ProblemsModal'

interface ProblemReporterButtonProps {
	node: Node
	icon?: JSX.Element
}

export function ProblemReporterButton({
	node,
	icon,
}: ProblemReporterButtonProps) {
	const [showProblems, setShowProblems] = useState(false)
	const { problems } = useProject()

	const nodeProblems = problems.filter(p => p.node.id === node.id)

	if (!nodeProblems.length) {
		return null
	}

	return (
		<>
			{icon || (
				<ProblemIcon
					problem={nodeProblems[0]}
					onPress={() => setShowProblems(true)}
				/>
			)}

			<ProblemModal
				problems={nodeProblems}
				visible={showProblems}
				setVisible={setShowProblems}
			/>
		</>
	)
}
