import React, { createContext, useContext, useState } from 'react'
import { Entity } from '../models/entity'
import { Project } from '../models/project'
import { OneOrMany } from '../utils/type-helpers'

export const ProjectContext = createContext<Project | null>(null)

export function ProjectProvider(props: { children: OneOrMany<JSX.Element> }) {
	const [entities, setEntities] = useState<Entity[]>([])
	const addEntity = (newEntity: Entity) => setEntities([...entities, newEntity])

	const initialContext = { entities, addEntity }
	return (
		<ProjectContext.Provider value={initialContext}>
			{props.children}
		</ProjectContext.Provider>
	)
}

export function useProject() {
	const context = useContext(ProjectContext)
	if (context === null) {
		throw new Error('useProject must be used within a ProjectProvider')
	}
	return context
}
