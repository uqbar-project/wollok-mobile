import React, { useState } from 'react'
import { Node, Problem } from 'wollok-ts'
import { useProject } from '../../context/ProjectProvider'
import { log } from '../../utils/commons'
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
			Node: n => n.id === problem.node.id,
		})

	log(problems[problems.length - 1].node.ancestors().map(a => a.kind))

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
