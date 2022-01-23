import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, TextInput, withTheme } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Expression, Field } from 'wollok-ts/dist/model'
import { useEntity } from '../../../context/EntityProvider'
import { Theme } from '../../../theme'
import { translate } from '../../../utils/translation-helpers'
import CheckIcon from '../../ui/CheckIcon'
import ExpressionView from '../../ui/ExpressionView'
import FormModal from '../../ui/FormModal/FormModal'
import { ATTRIBUTE_ICONS } from '../attribute-icons'

type Props = {
	visible: boolean
	setVisible: (visible: boolean) => void
	theme: Theme
}

const AttributeFormModal = (props: Props) => {
	const {
		actions: { addMember },
		entity,
	} = useEntity()
	const [name, setName] = useState('')
	const [isConstant, setConstant] = useState(false)
	const [isProperty, setProperty] = useState(false)
	const [initialValue, setInitialValue] = useState<Expression>()
	const { visible, setVisible } = props

	const styles = getStyles(props.theme)

	const checkboxes = [
		{
			checked: isProperty,
			setChecked: setProperty,
			icons: ATTRIBUTE_ICONS.property,
			text: upperCaseFirst(translate('entityDetails.attributeModal.property')),
		},
		{
			checked: isConstant,
			setChecked: setConstant,
			icons: ATTRIBUTE_ICONS.constant,
			text: upperCaseFirst(translate('entityDetails.attributeModal.constant')),
		},
	]

	return (
		<FormModal
			title={translate('entityDetails.attributeModal.newAttribute')}
			resetForm={resetForm}
			onSubmit={newAttribute}
			visible={visible}
			setVisible={setVisible}>
			<TextInput
				label={translate('entityDetails.attributeModal.nameOfAttribute')}
				onChangeText={setName}
			/>

			{checkboxes.map(cbox => {
				return (
					<View key={cbox.text} style={styles.checkbox}>
						<CheckIcon {...cbox} />
						<Text style={styles.constName}>{cbox.text}</Text>
					</View>
				)
			})}

			<ExpressionView
				value={initialValue}
				setValue={setInitialValue}
				fqn={entity.fullyQualifiedName()}
			/>
		</FormModal>
	)

	function resetForm() {
		setName('')
		setConstant(false)
		setProperty(false)
		setInitialValue(undefined)
	}

	function newAttribute() {
		addMember(new Field({ name, isConstant, isProperty, value: initialValue }))
	}
}

const getStyles = (_theme: Theme) =>
	StyleSheet.create({
		checkbox: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
		constName: { fontSize: 16 },
	})

export default withTheme(AttributeFormModal)
