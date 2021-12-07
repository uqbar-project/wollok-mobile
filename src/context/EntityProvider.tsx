import React, { createContext, useContext, useState } from 'react'
import { Attribute } from '../models/attribute'
import { Entity } from '../models/entity'
import { Method } from '../models/method'
import { OneOrMany } from '../utils/type-helpers'

export const EntityContext = createContext<{
	entity: Entity
	actions: Actions
} | null>(null)

type Actions = {
	addMethod: (method: Method) => void
	addAttribute: (attribute: Attribute) => void
}

export function EntityProvider(props: {
	children: OneOrMany<JSX.Element>
	initialEntity: Entity
}) {
	const [entity, setEntity] = useState<Entity>(props.initialEntity)
	const addMethod = (newMethod: Method) =>
		setEntity(entity.addMethod(newMethod))

	const addAttribute = (newAttribute: Attribute) =>
		setEntity(entity.addAttribute(newAttribute))
	const initialContext = {
		entity: entity,
		actions: { addMethod, addAttribute },
	}
	return (
		<EntityContext.Provider value={initialContext}>
			{props.children}
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
