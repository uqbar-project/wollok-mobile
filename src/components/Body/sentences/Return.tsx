import React from 'react'
import { IconButton } from 'react-native-paper'
import { Return as ReturnModel } from 'wollok-ts/dist/model'
import { useTheme } from '../../../theme'
import { ExpressionDisplay } from '../../expressions/ExpressionDisplay'
import { ProblemReporterButton } from '../../problems/ProblemReporterButton'
import { Row } from '../../ui/Row'

export const returnIcon = 'arrow-expand-up'

export function Return(props: { returnSentence: ReturnModel }) {
	const theme = useTheme()
	return (
		<Row>
			<ProblemReporterButton node={props.returnSentence} />
			<IconButton icon={returnIcon} color={theme.colors.primary} />
			<ExpressionDisplay
				expression={props.returnSentence.value}
				withIcon={false}
			/>
		</Row>
	)
}
