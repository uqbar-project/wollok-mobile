import React, { createContext } from 'react'
import { Module } from 'wollok-ts/dist/model'
import { ParentComponentProp } from '../utils/type-helpers'
import { EntityMember } from '../utils/wollok-helpers'
import { createContextHook } from './create-context-hook'
import { useProject } from './ProjectProvider'

export const EntityContext = createContext<{
	entity: Module
	actions: Actions
} | null>(null)

type Actions = {
	addMember: (newMember: EntityMember) => void
	changeMember: (oldMember: EntityMember, newMember: EntityMember) => void
}

export function EntityProvider(
	props: ParentComponentProp<{
		entity: Module
	}>,
) {
	const { children, entity } = props
	const {
		actions: { rebuildEnvironment },
	} = useProject()

	const addMember = (newMember: EntityMember) => {
		rebuildEnvironment(
			entity.copy({
				members: [...entity.members, newMember],
			}) as Module,
		)
	}

	const changeMember = (oldMember: EntityMember, newMember: EntityMember) => {
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

export const useEntity = createContextHook(EntityContext, {
	hookName: 'useEntity',
	contextName: 'EntityProvider',
})
