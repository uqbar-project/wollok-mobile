import { useNavigation } from '@react-navigation/core'
import { HeaderBackButton } from '@react-navigation/stack'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { useExpression } from '../../context/ExpressionProvider'
import { Expression } from '../../models/expression/expression'

export type ExpressionOnSubmit = (expression: Expression) => void

export const ExpressionBackButton = () => {
	const navigation = useNavigation()
	const {
		actions: { reset },
	} = useExpression()
	function goBack() {
		reset()
		navigation.goBack()
	}
	return <HeaderBackButton onPress={goBack} />
}

export const ExpressionCheckButton = (props: {
	onSubmit: ExpressionOnSubmit
}) => {
	const navigation = useNavigation()
	const {
		expression,
		actions: { reset },
	} = useExpression()
	return (
		<IconButton
			disabled={expression.isEmpty()}
			icon="check"
			onPress={() => {
				props.onSubmit(expression)
				reset()
				navigation.goBack()
			}}
		/>
	)
}
