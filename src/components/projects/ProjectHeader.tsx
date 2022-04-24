import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Badge, IconButton } from 'react-native-paper'
import { Entity, Node } from 'wollok-ts/dist/model'
import { useProject } from '../../context/ProjectProvider'
import { HomeScreenNavigationProp } from '../../pages/Home'
import {
	entityMemberFQN,
	EntityMemberWithBody,
} from '../../utils/wollok-helpers'
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

	// Duplicated code
	const navigation = useNavigation<HomeScreenNavigationProp>()

	const goToEntityDetails = (entity: Entity) => {
		navigation.navigate('EntityDetails', {
			entityFQN: entity.fullyQualifiedName(),
		})
	}
	const goToEditor = (entityMember: EntityMemberWithBody) => {
		navigation.navigate('Editor', {
			fqn: entityMemberFQN(entityMember),
		})
	}

	const goto = (n: Node): void => {
		n.match({
			Method: goToEditor,
			Test: goToEditor,
			Singleton: goToEntityDetails,
			Describe: goToEntityDetails,
			Field: f => goToEntityDetails(f.parent),
			Body: b => goto(b.parent),
			Sentence: e => goto(e.parent),
			Expression: e => goto(e.parent),
		})

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
