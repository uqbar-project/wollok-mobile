import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text, withTheme } from 'react-native-paper'
import { Expression, Name } from 'wollok-ts/dist/model'
import { useExpression } from '../../context/ExpressionProvider'
import { EntitiesScreenNavigationProp } from '../../pages/Entities/Entities'
import { Theme } from '../../theme'
import { translate } from '../../utils/translation-helpers'
import { ExpressionDisplay } from '../expressions/ExpressionDisplay'

type Props = {
	value?: Expression
	setValue: (expression?: Expression) => void
	theme: Theme
	fqn: Name
}

const ExpressionView = (props: Props) => {
	const {
		actions: { setExpression },
	} = useExpression()
	const { value, setValue } = props

	const navigation = useNavigation<EntitiesScreenNavigationProp>()
	const goToExpressionMaker = () => {
		if (value) {
			setExpression(value)
		}
		navigation.navigate('ExpressionMaker', {
			onSubmit: setValue,
			contextFQN: props.fqn,
		})
	}

	const styles = getStyles(props.theme)
	return (
		<View
			style={styles.expressionContainer}
			onTouchEnd={() => !value && goToExpressionMaker()}>
			{value ? (
				<View style={styles.initialValueInput}>
					<ExpressionDisplay expression={value} />
					<View style={styles.initialValueOptions}>
						<IconButton icon="pencil" onPress={goToExpressionMaker} />
						<IconButton icon="eraser" onPress={() => setValue(undefined)} />
					</View>
				</View>
			) : (
				<Text style={styles.initialValuePlaceholder}>
					{/* TODO: Param this text? */}
					{translate('entityDetails.attributeModal.addAnInitialValue')}
				</Text>
			)}
		</View>
	)
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
		initialValuePlaceholder: {
			fontSize: 18,
			marginVertical: 10,
			marginLeft: 10,
			color: theme.colors.placeholder,
		},
		initialValueOptions: { display: 'flex', flexDirection: 'row' },
	})

export default withTheme(ExpressionView)
