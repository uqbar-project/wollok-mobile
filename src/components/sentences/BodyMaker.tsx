import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { upperCaseFirst } from 'upper-case-first'
import { Body, Expression, Return, Sentence } from 'wollok-ts/dist/model'
import {
	ExpressionMakerScreenProp,
	ExpressionOnSubmit,
} from '../../pages/ExpressionMaker'
import { wTranslate } from '../../utils/translation/translation-helpers'
import {
	allScopedVariables,
	CodeContainer,
	entityMemberFQN,
} from '../../utils/wollok-helpers'
import MultiFabScreen from '../FabScreens/MultiFabScreen'
import { SubmitCheckButton } from '../ui/Header'
import { AssignmentFormModal } from './AssignmentFormModal'
import SentencesView from './SentencesView'
import { VariableFormModal } from './VariableForm'
import { returnIconName } from './VisualSentence'

type BodyMakerProps = {
	codeContainer: CodeContainer
	setBody: (newSentence: Body) => void
}
export function BodyMaker({ codeContainer, setBody }: BodyMakerProps) {
	const navigation = useNavigation<ExpressionMakerScreenProp>()
	const [assignmentModalVisible, setAssignmentModalVisible] = useState(false)
	const [variableModalVisible, setVariableModalVisible] = useState(false)
	const [sentences, setSentences] = useState<Sentence[]>(
		Array.from(codeContainer.sentences()),
	)

	const contextFQN = entityMemberFQN(codeContainer)

	function addSentence(sentence: Sentence) {
		setSentences([...sentences, sentence])
	}

	function addReturn(expression: Expression) {
		addSentence(new Return({ value: expression }))
	}

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<SubmitCheckButton
					onSubmit={() => {
						setBody(new Body({ sentences }))
					}}
				/>
			),
		})
	}, [navigation, sentences, setBody])

	function goToExpressionMaker(onSubmit: ExpressionOnSubmit) {
		return () => {
			navigation.navigate('ExpressionMaker', {
				onSubmit,
				contextFQN,
			})
		}
	}

	const actions = [
		{
			icon: 'message',
			onPress: goToExpressionMaker(addSentence),
			label: upperCaseFirst(wTranslate('sentence.messageSend')),
		},
		{
			icon: 'arrow-right',
			onPress: () => {
				setAssignmentModalVisible(true)
			},
			label: upperCaseFirst(wTranslate('sentence.assignment')),
		},
		{
			icon: returnIconName,
			onPress: goToExpressionMaker(addReturn),
			label: upperCaseFirst(wTranslate('sentence.return')),
		},
		{
			icon: 'variable',
			onPress: () => {
				setVariableModalVisible(true)
			},
			label: upperCaseFirst(wTranslate('sentence.variable')),
		},
	]

	return (
		<MultiFabScreen actions={actions}>
			<SentencesView sentences={sentences} />

			<AssignmentFormModal
				variables={allScopedVariables(codeContainer)}
				onSubmit={addSentence}
				setVisible={setAssignmentModalVisible}
				contextFQN={contextFQN}
				visible={assignmentModalVisible}
			/>

			<VariableFormModal
				onSubmit={addSentence}
				setVisible={setVariableModalVisible}
				contextFQN={contextFQN}
				visible={variableModalVisible}
			/>
		</MultiFabScreen>
	)
}
