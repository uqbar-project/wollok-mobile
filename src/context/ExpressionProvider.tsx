import { useNavigation } from '@react-navigation/native'
import React, { createContext, useContext, useState } from 'react'
import { Expression } from '../models/expression/expression'
import { Segment } from '../models/expression/segments'
import { EntitiesScreenNavigationProp } from '../pages/Entities/Entities'
import { OneOrMany } from '../utils/type-helpers'

export const ExpressionContext = createContext<{
	expression: Expression
	actions: Actions
} | null>(null)

type Actions = {
	addSegment: (segment: Segment) => void
	reset: () => void
	onSubmit: () => void
}

export function ExpressionProvider(props: {
	children: OneOrMany<JSX.Element>
	onSubmit: (expression: Expression) => void
}) {
	const navigation = useNavigation<EntitiesScreenNavigationProp>()
	const [expression, setExpression] = useState<Expression>(new Expression())
	const initialContext = {
		expression,
		actions: {
			addSegment: (segment: Segment) => {
				setExpression(expression.addSegment(segment))
			},
			reset: () => {
				setExpression(new Expression())
			},
			onSubmit: () => {
				props.onSubmit(expression)
				navigation.goBack()
			},
		},
	}
	return (
		<ExpressionContext.Provider value={initialContext}>
			{props.children}
		</ExpressionContext.Provider>
	)
}

export function useExpression() {
	const context = useContext(ExpressionContext)
	if (context === null) {
		throw new Error('useExpression must be used within a ExpressionProvider')
	}
	return context
}
