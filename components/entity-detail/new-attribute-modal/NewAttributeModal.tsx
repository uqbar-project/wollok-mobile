import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Attribute } from '../../../models/entity'
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
	const { visible, setVisible, onSubmit } = props

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

			<View style={styles.checkbox}>
				<CheckIcon
					checked={constant}
					setChecked={setConstant}
					checkedIconName="lock"
					uncheckedIconName="lock-open-outline"
				/>
				<Text style={styles.constName}>
					{upperCaseFirst(translate('entityDetails.attributeModal.constant'))}
				</Text>
			</View>
		</FormModal>
	)

	function resetForm() {
		setName('')
		setConstant(false)
	}

	function emmitNewAttribute() {
		onSubmit(new Attribute(name, constant))
	}
}

const styles = StyleSheet.create({
	checkbox: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
	constName: { fontSize: 16 },
})

export default AttributeFormModal
