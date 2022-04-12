import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Badge, IconButton } from 'react-native-paper'
import { Entity, Method, Node } from 'wollok-ts'
import { useProject } from '../../context/ProjectProvider'
import { EntityMemberScreenNavigationProp } from '../../pages/EntityMemberDetail'
import { HomeScreenNavigationProp } from '../../pages/Home'
import { methodFQN } from '../../utils/wollok-helpers'
import { ProblemModal } from '../problems/ProblemsModal'
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

	const projectProblems = problems.filter(
		p =>
			p.node.ancestors().includes(project.getNodeByFQN('main')) ||
			p.node.ancestors().includes(project.getNodeByFQN('tests')),
	) //TODO: Missing tests

	const goto = (n: Node): void =>
		n.match({
			Method: goToMethod,
			Singleton: goToEntityDetails,
			Field: f => goToEntityDetails(f.parent),
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

			<ProblemModal
				problems={projectProblems}
				visible={showProblems}
				setVisible={setShowProblems}
				onSelect={p => goto(p.node)}
			/>
		</Row>
	)
}
