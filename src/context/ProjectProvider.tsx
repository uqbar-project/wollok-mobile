import React, { createContext, useContext, useState } from 'react'
import { Entity } from '../models/entity'
import { Method } from '../models/method'
import { Project } from '../models/project'
import { OneOrMany } from '../utils/type-helpers'

export const ProjectContext = createContext<{
	project: Project
	actions: Actions
} | null>(null)

type Actions = {
	addEntity: (entity: Entity) => void
}

export function ProjectProvider(props: { children: OneOrMany<JSX.Element> }) {
	const [project, setProject] = useState<Project>(
		new Project()
			.addEntity(
				new Entity('pepita', 'Singleton', [new Method('vola', ['kms'])]),
			)
			.addEntity(
				new Entity('manolo', 'Singleton', [
					new Method('cambiaDeColor', ['color']),
					new Method('moveteA', ['posX', 'posY']),
				]),
			),
	)
	const addEntity = (newEntity: Entity) =>
		setProject(project.addEntity(newEntity))

	const initialContext = { project, actions: { addEntity } }
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
