import React, { createContext, useContext as useReactContext } from 'react'
import { Method, Module, Name } from 'wollok-ts/dist/model'
import { OneOrMany } from '../utils/type-helpers'

export type Context = Module | Method

export const ContextContext = createContext<{
	context: Context
	fqn: Name
	actions: Actions
} | null>(null)

type Actions = {}

export function ContextProvider(props: {
	children: OneOrMany<JSX.Element>
	context: Context
	fqn: Name
}) {
	const { children, context, fqn } = props

	const initialContext = {
		context,
		fqn,
		actions: {},
	}
	return (
		<ContextContext.Provider value={initialContext}>
			{children}
		</ContextContext.Provider>
	)
}

export function useContext() {
	const context = useReactContext(ContextContext)
	if (context === null) {
		throw new Error('useContext must be used within an ContextProvider')
	}
	return context
}
