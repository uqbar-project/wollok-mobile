import React, { createContext, useContext, useState } from 'react'
import { Expression } from 'wollok-ts/dist/model'
import { OneOrMany } from '../utils/type-helpers'

export const ExpressionContext = createContext<{
	expression?: Expression
	actions: Actions
} | null>(null)

type Actions = {
	reset: () => void
	setExpression: (expression: Expression) => void
}

export function ExpressionProvider(props: {
	children: OneOrMany<JSX.Element>
}) {
	const [expression, setExpression] = useState<Expression>()
	const initialContext = {
		expression,
		actions: {
			reset: () => {
				setExpression(undefined)
			},
			setExpression,
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
