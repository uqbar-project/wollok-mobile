import { useNavigation } from '@react-navigation/core'
import { HeaderBackButton } from '@react-navigation/stack'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { useExpression } from '../../context/ExpressionProvider'
import { Expression } from '../../models/expression/expression'

export type ExpressionOnSubmit = (expression: Expression) => void

function withExpressionGoBack<T>(
	Component: React.FC<T & { goBack: () => void }>,
) {
	return (props: T) => {
		const navigation = useNavigation()
		const {
			actions: { reset },
		} = useExpression()
		function goBack() {
			reset()
			navigation.goBack()
		}
		return <Component goBack={goBack} {...props} />
	}
}

export const ExpressionBackButton = withExpressionGoBack(({ goBack }) => (
	<HeaderBackButton onPress={goBack} />
))

// (props: {
//
// })

export const ExpressionCheckButton = withExpressionGoBack<{
	onSubmit: ExpressionOnSubmit
}>(({ goBack, onSubmit }) => {
	const { expression } = useExpression()
	return (
		<IconButton
			disabled={expression.isEmpty()}
			icon="check"
			onPress={() => {
				onSubmit(expression)
				goBack()
			}}
		/>
	)
})
