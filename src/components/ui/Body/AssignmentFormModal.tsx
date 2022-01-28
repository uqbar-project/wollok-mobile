import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Divider } from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import {
	Assignment,
	Expression,
	Field,
	Name,
	Reference,
	Variable,
} from 'wollok-ts/dist/model'
import { wTranslate } from '../../../utils/translation-helpers'
import { Referenciable } from '../../../utils/wollok-helpers'
import ExpressionView from '../ExpressionView'
import FormModal from '../FormModal/FormModal'

type AssignmentFormModalProps = {
	variables: Referenciable[]
	onSubmit: (assignment: Assignment) => void
	setVisible: (value: boolean) => void
	contextFQN: Name
	visible: boolean
}
export function AssignmentFormModal({
	variables,
	onSubmit,
	contextFQN,
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

	const variableList = variables.map(({ name }) => ({
		label: name,
		value: name,
	}))

	return (
		<FormModal onSubmit={submitAssignment} {...rest}>
			<DropDown
				dropDownStyle={styles.dropdown}
				label={wTranslate('sentence.selectVariable')}
				mode={'outlined'}
				visible={showVariableDropdown}
				showDropDown={() => setShowVariableDropdown(true)}
				onDismiss={() => setShowVariableDropdown(false)}
				value={variable?.name}
				setValue={selectVariable}
				list={variableList}
			/>
			<Divider style={styles.divider} />
			<ExpressionView value={value} setValue={setValue} fqn={contextFQN} />
		</FormModal>
	)
}

const styles = StyleSheet.create({
	divider: {
		marginTop: 10,
		marginBottom: 10,
	},
	dropdown: {
		marginTop: -25,
	},
})
