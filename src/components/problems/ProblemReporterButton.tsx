import React, { useState } from 'react'
import { Node, Problem } from 'wollok-ts'
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

	const belongsTo = (problem: Problem): boolean =>
		node.match({
			Method: m => problem.node.ancestors().includes(m),
			Test: t => problem.node.ancestors().includes(t),
			Node: n => n.id === problem.node.id,
		})

	const nodeProblems = problems.filter(belongsTo)

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