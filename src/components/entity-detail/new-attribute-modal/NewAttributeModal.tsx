import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { useEntity } from '../../../context/EntityProvider'
import { Attribute } from '../../../models/attribute'
import { translate } from '../../../utils/translation-helpers'
import CheckIcon from '../../ui/CheckIcon'
import FormModal from '../../ui/FormModal/FormModal'
import { ATTRIBUTE_ICONS } from '../attribute-icons'

type Props = {
	visible: boolean
	setVisible: (visible: boolean) => void
}

const AttributeFormModal = (props: Props) => {
	const {
		actions: { addAttribute },
	} = useEntity()
	const [name, setName] = useState('')
	const [constant, setConstant] = useState(false)
	const [property, setProperty] = useState(false)
	const { visible, setVisible } = props

	const checkboxes = [
		{
			checked: property,
			setChecked: setProperty,
			icons: ATTRIBUTE_ICONS.property,
			text: upperCaseFirst(translate('entityDetails.attributeModal.property')),
		},
		{
			checked: constant,
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
		</FormModal>
	)

	function resetForm() {
		setName('')
		setConstant(false)
		setProperty(false)
	}

	function newAttribute() {
		addAttribute(new Attribute(name, constant, property))
	}
}

const styles = StyleSheet.create({
	checkbox: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
	constName: { fontSize: 16 },
})

export default AttributeFormModal
