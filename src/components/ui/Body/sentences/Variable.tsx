import React from 'react'
import { IconButton, Text } from 'react-native-paper'
import { Variable as VariableModel } from 'wollok-ts/dist/model'
import { useTheme } from '../../../../theme'
import { isNullExpression } from '../../../../utils/wollok-helpers'
import { ExpressionDisplay } from '../../../expressions/ExpressionDisplay'
import { Row } from '../../Row'

export const Variable = (props: { variable: VariableModel }) => {
	const theme = useTheme()
	return (
		<Row>
			<IconButton icon="variable" color={theme.colors.primary} />
			{props.variable.isConstant ? (
				<IconButton icon="lock" color={theme.colors.primary} />
			) : (
				<></>
			)}
			<Text>{props.variable.name}</Text>
			{!isNullExpression(props.variable.value) ? (
				<>
					<IconButton icon="arrow-right" />
					<ExpressionDisplay
						expression={props.variable.value}
						withIcon={false}
					/>
				</>
			) : (
				<></>
			)}
		</Row>
	)
}
