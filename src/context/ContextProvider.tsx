import React, {
	createContext,
	useContext as useReactContext,
	useState,
} from 'react'
import { List, Method, Module, Name, Test } from 'wollok-ts/dist/model'
import { ParentComponentProp } from '../utils/type-helpers'
import { Named } from '../utils/wollok-helpers'

export type Context = Module | Method | Test

export const ContextContext = createContext<{
	context: Context
	fqn: Name
	search: string
	actions: Actions
} | null>(null)

type Actions = {
	setSearch: (value: string) => void
	clearSearch: () => void
	filterBySearch: <T extends Named>(entities: List<T>) => List<T>
}

export function ContextProvider(
	props: ParentComponentProp<{
		context: Context
		fqn: Name
	}>,
) {
	const { children, context, fqn } = props
	const [search, setSearch] = useState('')

	function clearSearch() {
		setSearch('')
	}

	function filterBySearch<T extends Named>(entities: List<T>) {
		return entities.filter(m =>
			m.name.toLowerCase().includes(search.toLowerCase()),
		)
	}

	const initialContext = {
		context,
		fqn,
		search,
		actions: { setSearch, filterBySearch, clearSearch },
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
