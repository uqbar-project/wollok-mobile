import React, { createContext, useContext } from 'react'
import { Field, Method, Module } from 'wollok-ts/dist/model'
import { OneOrMany } from '../utils/type-helpers'
import { useProject } from './ProjectProvider'

export const EntityContext = createContext<{
	entity: Module
	actions: Actions
} | null>(null)

type Actions = {
	addMember: (newMember: Method | Field) => void
	changeMember: (oldMember: Method | Field, newMember: Method | Field) => void
}

export function EntityProvider(props: {
	children: OneOrMany<JSX.Element>
	entity: Module
}) {
	const { children, entity } = props
	const {
		actions: { rebuildEnvironment },
	} = useProject()

	const addMember = (newMember: Method | Field) => {
		rebuildEnvironment(
			entity.copy({
				members: [...entity.members, newMember],
			}) as Module,
		)
	}

	const changeMember = (
		oldMember: Method | Field,
		newMember: Method | Field,
	) => {
		rebuildEnvironment(
			entity.copy({
				members: [...entity.members.filter(m => m !== oldMember), newMember],
			}) as Module,
		)
	}

	const initialContext = {
		entity: entity,
		actions: { addMember, changeMember },
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
