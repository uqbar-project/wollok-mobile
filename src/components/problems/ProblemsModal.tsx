import React from 'react'
import { ScrollView } from 'react-native'
import { List } from 'react-native-paper'
import { Node, Problem } from 'wollok-ts'
import { wTranslate } from '../../utils/translation-helpers'
import { methodFQN } from '../../utils/wollok-helpers'
import FormModal, { FormModalProps } from '../ui/FormModal/FormModal'
import { ProblemIcon } from './ProblemIcon'

interface ProblemsModalProp {
	problems: Problem[]
	onSelect?: (p: Problem) => void
}

export function ProblemModal({
	problems,
	onSelect,
	visible,
	setVisible,
}: ProblemsModalProp & Pick<FormModalProps, 'visible' | 'setVisible'>) {
	const nodeDescription = (n: Node): string | undefined =>
		n.match({
			Entity: s => s.name,
			Field: f => f.name,
			Method: methodFQN,
			Test: t => t.name,
			Body: b => nodeDescription(b.parent),
			Sentence: a => nodeDescription(a.parent),
		})

	return (
		<FormModal
			visible={visible}
			setVisible={setVisible}
			onSubmit={() => setVisible(false)}>
			<ScrollView>
				{problems.map((problem, i) => (
					<List.Item
						key={i}
						onPress={() => onSelect && onSelect(problem)}
						title={wTranslate(`problem.${problem.code}`)}
						titleNumberOfLines={2}
						left={() => <ProblemIcon problem={problem} />}
						description={nodeDescription(problem.node)}
					/>
				))}
			</ScrollView>
		</FormModal>
	)
}