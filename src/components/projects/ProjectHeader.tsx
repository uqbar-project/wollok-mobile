import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { Badge, IconButton, List } from 'react-native-paper'
import { Entity, Method, Node } from 'wollok-ts'
import { useProject } from '../../context/ProjectProvider'
import { EntityMemberScreenNavigationProp } from '../../pages/EntityMemberDetail'
import { HomeScreenNavigationProp } from '../../pages/Home'
import { wTranslate } from '../../utils/translation-helpers'
import { methodFQN } from '../../utils/wollok-helpers'
import FormModal from '../ui/FormModal/FormModal'
import { Row } from '../ui/Row'

interface ProjectHeaderProp {
	pushMessage: (tag: string) => void
}

export function ProjectHeader({ pushMessage }: ProjectHeaderProp) {
	const [showProblems, setShowProblems] = useState(false)
	const {
		project,
		changed,
		problems,
		actions: { save },
	} = useProject()

	// Duplicated code
	const navigation = useNavigation<
		HomeScreenNavigationProp & EntityMemberScreenNavigationProp
	>()
	const goToEntityDetails = (entity: Entity) => {
		navigation.navigate('EntityStack', {
			entityFQN: entity.fullyQualifiedName(),
		})

		setShowProblems(false)
	}
	const goToMethod = (method: Method) => {
		navigation.navigate('EntityMemberDetails', {
			entityMember: method,
			fqn: methodFQN(method),
		})

		setShowProblems(false)
	}

	const projectProblems = problems.filter(p =>
		p.node.ancestors().includes(project.getNodeByFQN('main')),
	) //Missing tests

	const nodeDescription = (n: Node) =>
		n.match({
			Method: methodFQN,
			Singleton: s => s.name,
			Field: f => f.name,
		})
	const goto = (n: Node): void =>
		n.match({
			Method: goToMethod,
			Singleton: goToEntityDetails,
			Field: f => goto(f.parent),
		})

	return (
		<Row>
			<IconButton
				disabled={!projectProblems.length}
				icon="alert-circle"
				onPress={() => {
					setShowProblems(true)
				}}
			/>
			<Badge>{projectProblems.length}</Badge>
			<IconButton
				disabled={!changed}
				icon="content-save"
				onPress={() => save().then(() => pushMessage('saved'))}
			/>
			<FormModal
				visible={showProblems}
				setVisible={setShowProblems}
				onSubmit={() => setShowProblems(false)}>
				<ScrollView>
					{projectProblems.map(problem => (
						<List.Item
							onPress={() => goto(problem.node)}
							title={wTranslate(`problem.${problem.code}`)}
							titleNumberOfLines={2}
							left={() =>
								problem.level === 'error' ? (
									<IconButton icon="alert-circle" color="red" />
								) : (
									<IconButton icon="alert" color="yellow" />
								)
							}
							description={nodeDescription(problem.node)}
						/>
					))}
				</ScrollView>
			</FormModal>
		</Row>
	)
}
