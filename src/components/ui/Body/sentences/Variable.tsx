import React from 'react'
import { Text } from 'react-native-paper'
import { Variable as VariableModel } from 'wollok-ts/dist/model'
import { Row } from '../../Row'

export const Variable = (props: { variable: VariableModel }) => {
	return (
		<Row>
			<Text>{props.variable.name}</Text>
		</Row>
	)
}
