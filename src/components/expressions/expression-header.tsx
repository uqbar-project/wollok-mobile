import { useNavigation } from '@react-navigation/core'
import { HeaderBackButton } from '@react-navigation/stack'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { Expression } from 'wollok-ts/dist/model'
import { useExpression } from '../../context/ExpressionProvider'

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

export const ExpressionCheckButton = withExpressionGoBack<{
	onSubmit: ExpressionOnSubmit
}>(({ goBack, onSubmit }) => {
	const { expression } = useExpression()
	return (
		<IconButton
			disabled={!expression}
			icon="check"
			onPress={() => {
				onSubmit(expression!)
				goBack()
			}}
		/>
	)
})
