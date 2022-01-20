import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import {
	Assignment,
	Expression,
	Field, Reference,
	Variable
} from 'wollok-ts/dist/model'
import MultiFabScreen from '../components/FabScreens/MultiFabScreen'
import FormModal from '../components/ui/FormModal/FormModal'
import { useEntity } from '../context/EntityProvider'
import { translate } from '../utils/translation-helpers'
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
	const { entity } = useEntity()
	const [assignmentModalVisible, setAssignmentModalVisible] = useState(false)
	function addAssignment(assignment: Assignment) {
		//TODO: new entity?
	}

	return (
		<MultiFabScreen
			actions={[
				{
					icon: 'arrow-right',
					onPress: () => {
						setAssignmentModalVisible(true)
					},
					label: upperCaseFirst(translate('assignment')),
				},
			]}>
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
	return (
		<FormModal onSubmit={submitAssignment} {...rest}>
			<Text>hola</Text>
		</FormModal>
	)
}
