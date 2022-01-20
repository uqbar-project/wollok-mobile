import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text, TextInput, withTheme } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Expression, Field } from 'wollok-ts/dist/model'
import { useEntity } from '../../../context/EntityProvider'
import { useExpression } from '../../../context/ExpressionProvider'
import { EntitiesScreenNavigationProp } from '../../../pages/Entities/Entities'
import { Theme } from '../../../theme'
import { translate } from '../../../utils/translation-helpers'
import { ExpressionDisplay } from '../../expressions/ExpressionDisplay'
import CheckIcon from '../../ui/CheckIcon'
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
	} = useEntity()
	const {
		actions: { setExpression },
	} = useExpression()
	const [name, setName] = useState('')
	const [isConstant, setConstant] = useState(false)
	const [isProperty, setProperty] = useState(false)
	const [initialValue, setInitialValue] = useState<Expression>()
	const { visible, setVisible } = props
	const navigation = useNavigation<EntitiesScreenNavigationProp>()
	const goToExpressionMaker = () => {
		if (initialValue) {
			setExpression(initialValue)
		}
		navigation.navigate('ExpressionMaker', { onSubmit: setInitialValue })
	}
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

			<View
				style={styles.expressionContainer}
				onTouchEnd={() => !initialValue && goToExpressionMaker()}>
				{initialValue ? (
					<View style={styles.initialValueInput}>
						<ExpressionDisplay expression={initialValue} />
						<View style={styles.initialValueOptions}>
							<IconButton icon="pencil" onPress={goToExpressionMaker} />
							<IconButton
								icon="eraser"
								onPress={() => setInitialValue(undefined)}
							/>
						</View>
					</View>
				) : (
					<Text style={styles.initialValuePlaceholder}>
						{translate('entityDetails.attributeModal.addAnInitialValue')}
					</Text>
				)}
			</View>
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

const getStyles = (theme: Theme) =>
	StyleSheet.create({
		expressionContainer: {
			borderColor: theme.colors.placeholder,
			borderWidth: 2,
			borderRadius: 7,
			minHeight: 24,
		},
		initialValueInput: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		checkbox: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
		constName: { fontSize: 16 },
		initialValuePlaceholder: {
			fontSize: 18,
			marginVertical: 10,
			marginLeft: 10,
			color: theme.colors.placeholder,
		},
		initialValueOptions: { display: 'flex', flexDirection: 'row' },
	})

export default withTheme(AttributeFormModal)
