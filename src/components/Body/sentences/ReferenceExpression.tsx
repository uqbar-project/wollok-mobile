import React from 'react'
import { IconButton } from 'react-native-paper'
import { Expression } from 'wollok-ts/dist/model'
import { ExpressionDisplay } from '../../expressions/ExpressionDisplay'
import { Row } from '../../ui/Row'

export const ReferenceExpression = (props: { expression: Expression }) => {
	return (
		<Row>
			<IconButton icon="arrow-right" />
			<ExpressionDisplay expression={props.expression} withIcon={false} />
		</Row>
	)
}
