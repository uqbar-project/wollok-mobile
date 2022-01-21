import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { IconButton, Text, TextInput } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import {
	Assignment,
	Body,
	Expression,
	Field,
	Literal,
	Reference,
	Sentence,
	Variable,
} from 'wollok-ts/dist/model'
import { ExpressionDisplay } from '../components/expressions/ExpressionDisplay'
import MultiFabScreen from '../components/FabScreens/MultiFabScreen'
import ExpressionView from '../components/ui/ExpressionView'
import FormModal from '../components/ui/FormModal/FormModal'
import { Row } from '../components/ui/Row'
import { translate } from '../utils/translation-helpers'
import { Mutable } from '../utils/type-helpers'
import { EntityStackParamList } from './EntityDetails/EntityDetails'

export type MethodDetailsScreenNavigationProp = StackNavigationProp<
	EntityStackParamList,
	'MethodDetails'
>

type Route = RouteProp<EntityStackParamList, 'MethodDetails'>

export const MethodDetail = ({
	route: {
		params: { method },
	},
}: {
	route: Route
}) => {
	// const { entity } = useEntity()
	const body = method.body as Mutable<Body>
	const [sentences, setSentences] = useState<Sentence[]>([
		...body.sentences,
		new Assignment({
			variable: new Reference({ name: 'energia' }),
			value: new Literal({ value: 90 }),
		}),
	])
	const [assignmentModalVisible, setAssignmentModalVisible] = useState(false)

	// function submit() {
	// 	body.sentences = sentences
	// }

	function addAssignment(assignment: Assignment) {
		setSentences([...sentences, assignment])
	}

	return (
		<MultiFabScreen
			actions={[
				{
					icon: 'arrow-right',
					onPress: () => {
						setAssignmentModalVisible(true)
					},
					label: upperCaseFirst(translate('sentence.assignment')),
				},
			]}>
			<ScrollView style={styles.sentences}>
				{sentences.map((sentence, i) => {
					switch (sentence.kind) {
						case 'Assignment':
							return (
								<Row key={i}>
									<Text>{sentence.variable.name}</Text>
									<IconButton icon="arrow-right" />
									<ExpressionDisplay
										expression={sentence.value}
										withIcon={false}
									/>
								</Row>
							)
					}
				})}
			</ScrollView>

			<AssignmentFormModal
				setVisible={setAssignmentModalVisible}
				visible={assignmentModalVisible}
				onSubmit={addAssignment}
			/>
		</MultiFabScreen>
	)
}

function AssignmentFormModal({
	onSubmit,
	...rest
}: {
	onSubmit: (assignment: Assignment) => void
	setVisible: (value: boolean) => void
	visible: boolean
}) {
	const [value, setValue] = useState<Expression>()
	const [variable, setReference] = useState<Reference<Field | Variable>>()

	function submitAssignment() {
		onSubmit(new Assignment({ value: value!, variable: variable! }))
	}

	function changeReference(name: string) {
		setReference(new Reference({ name }))
	}

	return (
		<FormModal onSubmit={submitAssignment} {...rest}>
			{/* TODO: Use dropdown with options */}
			<TextInput
				label={translate('sentence.nameOfVariable')}
				onChangeText={changeReference}
			/>
			<ExpressionView value={value} setValue={setValue} />
		</FormModal>
	)
}

const styles = StyleSheet.create({
	sentences: {
		paddingLeft: 15,
	},
})
