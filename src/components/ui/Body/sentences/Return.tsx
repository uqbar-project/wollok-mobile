import React from 'react'
import { Text } from 'react-native-paper'
import { Return as ReturnModel } from 'wollok-ts/dist/model'
import { ExpressionDisplay } from '../../../expressions/ExpressionDisplay'
import { Row } from '../../Row'

export function Return(props: { returnSentence: ReturnModel }) {
	return (
		<Row>
			<Text>Return</Text>
			<ExpressionDisplay expression={props.returnSentence.value} />
		</Row>
	)
}
