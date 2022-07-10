import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Expression, Field } from 'wollok-ts/dist/model'
import { wTranslate } from '../../../utils/translation/translation-helpers'
import { Visible } from '../../../utils/type-helpers'
import CheckIcon from '../../ui/CheckIcon'
import ExpressionInput from '../../ui/ExpressionInput'
import FormModal from '../../ui/FormModal/FormModal'
import { ATTRIBUTE_ICONS } from '../attribute-icons'

type AttributeFormModalProps = Visible & {
	title: string
	onSubmit: (f: Field) => void
	contextFQN: string
	initialAttribute?: Field
}

const AttributeFormModal = ({
	title,
	visible,
	setVisible,
	onSubmit,
	contextFQN,
	initialAttribute,
}: AttributeFormModalProps) => {
	const [name, setName] = useState(initialAttribute?.name || '')
	const [isConstant, setConstant] = useState(
		initialAttribute?.isConstant || false,
	)
	const [isProperty, setProperty] = useState(
		initialAttribute?.isProperty || false,
	)
	const [initialValue, setInitialValue] = useState<Expression | undefined>(
		initialAttribute?.value,
	)

	const checkboxes = [
		{
			checked: isProperty,
			setChecked: setProperty,
			icons: ATTRIBUTE_ICONS.property,
			text: upperCaseFirst(wTranslate('entityDetails.attributeModal.property')),
		},
		{
			checked: isConstant,
			setChecked: setConstant,
			icons: ATTRIBUTE_ICONS.constant,
			text: upperCaseFirst(wTranslate('entityDetails.attributeModal.constant')),
		},
	]

	return (
		<FormModal
			title={title}
			resetForm={resetForm}
			onSubmit={newAttribute}
			visible={visible}
			valid={name.length > 0}
			setVisible={setVisible}>
			<TextInput
				label={wTranslate('entityDetails.attributeModal.nameOfAttribute')}
				onChangeText={setName}
				value={name}
			/>
			<>
				{checkboxes.map(cbox => (
					<View key={cbox.text} style={styles.checkbox}>
						<CheckIcon {...cbox} />
						<Text style={styles.constName}>{cbox.text}</Text>
					</View>
				))}
			</>

			<ExpressionInput
				value={initialValue}
				setValue={setInitialValue}
				contextFQN={contextFQN}
				inputPlaceholder={wTranslate(
					'entityDetails.attributeModal.addAnInitialValue',
				)}
			/>
		</FormModal>
	)

	function resetForm() {
		if (!initialAttribute) {
			setName('')
			setConstant(false)
			setProperty(false)
			setInitialValue(undefined)
		}
	}

	function newAttribute() {
		onSubmit(new Field({ name, isConstant, isProperty, value: initialValue }))
	}
}

const styles = StyleSheet.create({
	checkbox: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
	constName: { fontSize: 16 },
})

export default AttributeFormModal
