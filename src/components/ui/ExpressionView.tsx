import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text, withTheme } from 'react-native-paper'
import { Expression, Name } from 'wollok-ts/dist/model'
import { ExpressionMakerScreenProp } from '../../pages/ExpressionMaker/ExpressionMaker'
import { Theme } from '../../theme'
import { ExpressionDisplay } from '../expressions/ExpressionDisplay'

type Props = {
	value?: Expression
	setValue: (expression?: Expression) => void
	theme: Theme
	fqn: Name
	inputPlaceholder: string
}

const ExpressionView = (props: Props) => {
	const { value, setValue } = props
	const navigation = useNavigation<ExpressionMakerScreenProp>()
	const goToExpressionMaker = () => {
		navigation.push('ExpressionMaker', {
			onSubmit: setValue,
			contextFQN: props.fqn,
			initialExpression: value,
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
					{props.inputPlaceholder}
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
