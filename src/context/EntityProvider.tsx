import React, { createContext, useContext } from 'react'
import { Field, Method, Module } from 'wollok-ts/dist/model'
import { Mutable, OneOrMany } from '../utils/type-helpers'

type Entity = Mutable<Module>

export const EntityContext = createContext<{
	entity: Entity
	actions: Actions
} | null>(null)

type Actions = {
	addMember: (method: Method | Field) => void
}

export function EntityProvider(props: {
	children: OneOrMany<JSX.Element>
	entity: Entity
}) {
	const { children, entity } = props

	const addMember = (newMember: Method | Field) => {
		entity.members = [...entity.members, newMember]
	}

	const initialContext = {
		entity: entity,
		actions: { addMember },
	}
	return (
		<EntityContext.Provider value={initialContext}>
			{children}
		</EntityContext.Provider>
	)
}

export function useEntity() {
	const context = useContext(EntityContext)
	if (context === null) {
		throw new Error('useEntity must be used within an EntityProvider')
	}
	return context
}
