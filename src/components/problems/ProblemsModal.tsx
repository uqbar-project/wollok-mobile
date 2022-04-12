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
	const nodeDescription = (n: Node) =>
		n.match({
			Method: methodFQN,
			Singleton: s => s.name,
			Field: f => f.name,
		})

	return (
		<FormModal
			visible={visible}
			setVisible={setVisible}
			onSubmit={() => setVisible(false)}>
			<ScrollView>
				{problems.map(problem => (
					<List.Item
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
