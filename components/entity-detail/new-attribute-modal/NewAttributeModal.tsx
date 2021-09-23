import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Attribute } from '../../../models/parameter'
import { translate } from '../../../utils/translation-helpers'
import CheckIcon from '../../ui/CheckIcon'
import FormModal from '../../ui/FormModal/FormModal'

type Props = {
	visible: boolean
	setVisible: (visible: boolean) => void
	onSubmit: (attribute: Attribute) => void
}

const AttributeFormModal = (props: Props) => {
	const [name, setName] = useState('')
	const [constant, setConstant] = useState(false)
	const [property, setProperty] = useState(false)
	const { visible, setVisible, onSubmit } = props

	const checkboxes = [
		{
			checked: property,
			setChecked: setProperty,
			checkedIconName: 'swap-horizontal-circle',
			uncheckedIconName: 'swap-horizontal-circle-outline',
			text: upperCaseFirst(translate('entityDetails.attributeModal.property')),
		},
		{
			checked: constant,
			setChecked: setConstant,
			checkedIconName: 'lock',
			uncheckedIconName: 'lock-open-outline',
			text: upperCaseFirst(translate('entityDetails.attributeModal.constant')),
		},
	]

	return (
		<FormModal
			title={translate('entityDetails.attributeModal.newAttribute')}
			resetForm={resetForm}
			onSubmit={emmitNewAttribute}
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
		</FormModal>
	)

	function resetForm() {
		setName('')
		setConstant(false)
		setProperty(false)
	}

	function emmitNewAttribute() {
		onSubmit(new Attribute(name, constant, property))
	}
}

const styles = StyleSheet.create({
	checkbox: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
	constName: { fontSize: 16 },
})

export default AttributeFormModal
