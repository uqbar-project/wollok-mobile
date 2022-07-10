import React, { useState } from 'react'
import { Text, TextInput } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Expression, Name, Variable } from 'wollok-ts/dist/model'
import { wTranslate } from '../../utils/translation/translation-helpers'
import CheckIcon from '../ui/CheckIcon'
import ExpressionInput from '../ui/ExpressionInput'
import FormModal from '../ui/FormModal/FormModal'
import { Row } from '../ui/Row'

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
			<ExpressionInput
				value={value}
				setValue={setValue}
				contextFQN={contextFQN}
				inputPlaceholder={wTranslate('expression.enterValue')}
			/>
		</FormModal>
	)
}
