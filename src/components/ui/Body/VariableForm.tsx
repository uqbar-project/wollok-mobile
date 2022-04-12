import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Divider, Text, TextInput } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Expression, Name, Variable } from 'wollok-ts/dist/model'
import { wTranslate } from '../../../utils/translation-helpers'
import CheckIcon from '../CheckIcon'
import ExpressionInput from '../ExpressionInput'
import FormModal from '../FormModal/FormModal'
import { Row } from '../Row'

type VariableFormModalProps = {
	onSubmit: (assignment: Variable) => void
	setVisible: (value: boolean) => void
	contextFQN: Name
	visible: boolean
}
export function VariableFormModal({
	onSubmit,
	contextFQN,
	...rest
}: VariableFormModalProps) {
	const [value, setValue] = useState<Expression>()
	const [name, setName] = useState<string>()
	const [isConstant, setConstant] = useState(false)

	function submitVariable() {
		onSubmit(new Variable({ value, name: name!, isConstant }))
	}
	function resetForm() {
		setValue(undefined)
		setName(undefined)
		setConstant(false)
	}

	return (
		<FormModal onSubmit={submitVariable} resetForm={resetForm} {...rest}>
			<TextInput
				onChangeText={setName}
				placeholder={wTranslate('sentence.variableName')}
			/>
			<Row>
				<CheckIcon
					checked={isConstant}
					setChecked={setConstant}
					icons={{ checked: 'lock', unchecked: 'lock-open-outline' }}
				/>
				<Text>{upperCaseFirst(wTranslate('sentence.constant'))}</Text>
			</Row>
			<Divider style={styles.divider} />
			<ExpressionInput
				value={value}
				setValue={setValue}
				fqn={contextFQN}
				inputPlaceholder={wTranslate('expression.enterValue')}
			/>
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
