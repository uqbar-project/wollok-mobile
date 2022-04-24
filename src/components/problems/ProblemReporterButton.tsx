import React, { useState } from 'react'
import { Node, Problem } from 'wollok-ts/dist/model'
import { useProject } from '../../context/ProjectProvider'
import { isError } from '../../utils/wollok-helpers'
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
			Return: r => r.id === problem.node.id || r.value?.id === problem.node.id,
			Node: n => n.id === problem.node.id,
		})

	const nodeProblems = problems.filter(belongsTo)

	if (!nodeProblems.length) {
		return null
	}

	const maybeError = nodeProblems.find(isError)

	return (
		<>
			{icon || (
				<ProblemIcon
					problem={maybeError || nodeProblems[0]}
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
