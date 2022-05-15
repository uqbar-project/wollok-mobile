import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { upperCaseFirst } from 'upper-case-first'
import { Body, Expression, Node, Return, Sentence } from 'wollok-ts/dist/model'
import { ExpressionOnSubmit } from '../../pages/ExpressionMaker'
import { wTranslate } from '../../utils/translation-helpers'
import {
	allScopedVariables,
	CodeContainer,
	entityMemberFQN,
} from '../../utils/wollok-helpers'
import MultiFabScreen from '../FabScreens/MultiFabScreen'
import { SubmitCheckButton } from '../ui/Header'
import { AssignmentFormModal } from './AssignmentFormModal'
import { VariableFormModal } from './VariableForm'
import VisualSentence, { returnIconName } from './VisualSentence'

type BodyMakerProps = {
	codeContainer: CodeContainer
	setBody: (newSentence: Body) => void
	highlightedNode?: Node
}
export function BodyMaker({
	codeContainer,
	setBody,
	highlightedNode,
}: BodyMakerProps) {
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

	const navigation = useNavigation()
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
			<ScrollView style={styles.sentences}>
				{sentences.map((sentence, i) => (
					<VisualSentence
						key={i}
						sentence={sentence}
						highlightedNode={highlightedNode}
					/>
				))}
			</ScrollView>

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

const styles = StyleSheet.create({
	sentences: {
		paddingLeft: 15,
	},
})
