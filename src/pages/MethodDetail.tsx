import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Divider, IconButton, Text } from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import { upperCaseFirst } from 'upper-case-first'
import {
	Assignment,
	Body,
	Expression,
	Field,
	Method,
	Reference,
	Sentence,
	Variable,
} from 'wollok-ts/dist/model'
import { ExpressionDisplay } from '../components/expressions/ExpressionDisplay'
import MultiFabScreen from '../components/FabScreens/MultiFabScreen'
import ExpressionView from '../components/ui/ExpressionView'
import FormModal from '../components/ui/FormModal/FormModal'
import { SubmitCheckButton } from '../components/ui/Header'
import { Row } from '../components/ui/Row'
import { useEntity } from '../context/EntityProvider'
import { translate } from '../utils/translation-helpers'
import { allFields, allVariables } from '../utils/wollok-helpers'
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
	const {
		actions: { changeMember },
	} = useEntity()
	const [sentences, setSentences] = useState<Sentence[]>(
		Array.from(method.sentences()),
	)
	const [assignmentModalVisible, setAssignmentModalVisible] = useState(false)

	const navigation = useNavigation()
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<SubmitCheckButton
					onSubmit={() => {
						changeMember(
							method,
							method.copy({ body: new Body({ sentences }) }) as Method,
						)
					}}
				/>
			),
		})
	}, [navigation, sentences, method, changeMember])

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
						default:
							return (
								<Row key={i}>
									<Text>{sentence.kind}</Text>
								</Row>
							)
					}
				})}
			</ScrollView>

			<AssignmentFormModal
				method={method}
				onSubmit={addAssignment}
				setVisible={setAssignmentModalVisible}
				visible={assignmentModalVisible}
			/>
		</MultiFabScreen>
	)
}

type AssignmentFormModalProps = {
	method: Method
	onSubmit: (assignment: Assignment) => void
	setVisible: (value: boolean) => void
	visible: boolean
}
function AssignmentFormModal({
	method,
	onSubmit,
	...rest
}: AssignmentFormModalProps) {
	const [showVariableDropdown, setShowVariableDropdown] = useState(false)
	const [value, setValue] = useState<Expression>()
	const [variable, setReference] = useState<Reference<Field | Variable>>()

	function submitAssignment() {
		onSubmit(new Assignment({ value: value!, variable: variable! }))
	}

	function selectVariable(name: string) {
		setReference(new Reference({ name }))
	}

	// TODO: Filter constants?
	const fields = allFields(method.parent())
	const params = method.parameters
	const methodVars = allVariables(method)
	const variableList = [...fields, ...params, ...methodVars].map(
		({ name }) => ({ label: name, value: name }),
	)

	return (
		<FormModal onSubmit={submitAssignment} {...rest}>
			<DropDown
				dropDownStyle={styles.dropdown}
				label={translate('sentence.selectVariable')}
				mode={'outlined'}
				visible={showVariableDropdown}
				showDropDown={() => setShowVariableDropdown(true)}
				onDismiss={() => setShowVariableDropdown(false)}
				value={variable?.name}
				setValue={selectVariable}
				list={variableList}
			/>
			<Divider style={styles.divider} />
			<ExpressionView value={value} setValue={setValue} />
		</FormModal>
	)
}

const styles = StyleSheet.create({
	sentences: {
		paddingLeft: 15,
	},
	divider: {
		marginTop: 10,
		marginBottom: 10,
	},
	dropdown: {
		marginTop: -25,
	},
})
