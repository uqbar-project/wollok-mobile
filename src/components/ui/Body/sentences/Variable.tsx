import React from 'react'
import { IconButton, Text } from 'react-native-paper'
import { Variable as VariableModel } from 'wollok-ts/dist/model'
import { useTheme } from '../../../../theme'
import { isNullExpression } from '../../../../utils/wollok-helpers'
import { ProblemReporterButton } from '../../../problems/ProblemReporterButton'
import { ConstantVariableIcon } from '../../ConstantVariableIcon'
import { Row } from '../../Row'
import { ReferenceExpression } from './ReferenceExpression'

export const Variable = (props: { variable: VariableModel }) => {
	const theme = useTheme()
	return (
		<Row>
			<ProblemReporterButton node={props.variable} />
			<IconButton icon="variable" color={theme.colors.primary} />
			<ConstantVariableIcon variable={props.variable} />
			<Text>{props.variable.name}</Text>
			<>
				{!isNullExpression(props.variable.value) && (
					<ReferenceExpression expression={props.variable.value} />
				)}
			</>
		</Row>
	)
}
