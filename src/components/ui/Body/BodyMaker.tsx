import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { upperCaseFirst } from 'upper-case-first'
import { Body, List, Name, Sentence } from 'wollok-ts/dist/model'
import { wTranslate } from '../../../utils/translation-helpers'
import { Referenciable } from '../../../utils/wollok-helpers'
import MultiFabScreen from '../../FabScreens/MultiFabScreen'
import { SubmitCheckButton } from '../Header'
import { AssignmentFormModal } from './AssignmentFormModal'
import { getVisualSentence } from './sentences/getVisualSentence'

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

	function addSentence(assignment: Sentence) {
		setSentences([...sentences, assignment])
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

	function goToExpressionMaker() {
		navigation.navigate('ExpressionMaker', {
			onSubmit: addSentence,
			contextFQN,
		})
	}

	return (
		<MultiFabScreen
			actions={[
				{
					icon: 'message',
					onPress: goToExpressionMaker,
					label: upperCaseFirst(wTranslate('sentence.messageSend')),
				},
				{
					icon: 'arrow-right',
					onPress: () => {
						setAssignmentModalVisible(true)
					},
					label: upperCaseFirst(wTranslate('sentence.assignment')),
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
