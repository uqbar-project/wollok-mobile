import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { upperCaseFirst } from 'upper-case-first'
import {
	Body,
	Expression,
	List,
	Name,
	Return,
	Sentence,
} from 'wollok-ts/dist/model'
import { ExpressionOnSubmit } from '../../../pages/ExpressionMaker/ExpressionMaker'
import { wTranslate } from '../../../utils/translation-helpers'
import { Referenciable } from '../../../utils/wollok-helpers'
import MultiFabScreen from '../../FabScreens/MultiFabScreen'
import { SubmitCheckButton } from '../Header'
import { AssignmentFormModal } from './AssignmentFormModal'
import { getVisualSentence } from './sentences/getVisualSentence'
import { returnIcon as returnIconName } from './sentences/Return'

type BodyMakerProps = {
	sentences: List<Sentence>
	variables: Referenciable[]
	contextFQN: Name
	setBody: (newSentence: Body) => void
}
export function BodyMaker({
	sentences: initialSentences,
	setBody,
	variables,
	contextFQN,
}: BodyMakerProps) {
	const [assignmentModalVisible, setAssignmentModalVisible] = useState(false)
	const [sentences, setSentences] = useState<Sentence[]>(
		Array.from(initialSentences),
	)

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

	return (
		<MultiFabScreen
			actions={[
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
			]}>
			<ScrollView style={styles.sentences}>
				{sentences.map(getVisualSentence)}
			</ScrollView>

			<AssignmentFormModal
				variables={variables}
				onSubmit={addSentence}
				setVisible={setAssignmentModalVisible}
				contextFQN={contextFQN}
				visible={assignmentModalVisible}
			/>
		</MultiFabScreen>
	)
}

const styles = StyleSheet.create({
	sentences: {
		paddingLeft: 15,
	},
})
