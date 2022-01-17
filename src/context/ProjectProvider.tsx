import React, { createContext, useContext } from 'react'
import { Attribute } from '../models/attribute'
import { Entity } from '../models/entity'
import { Expression } from '../models/expression/expression'
import { Literal } from '../models/expression/segments'
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

function testSeed(project: Project) {
	project.addEntity(
		new Entity(
			'pepita',
			'Singleton',
			[new Method('vola', ['kms'])],
			[
				new Attribute(
					'energia',
					false,
					true,
					new Expression([new Literal(100)]),
				),
			],
		),
	)
	project.addEntity(
		new Entity('manolo', 'Singleton', [
			new Method('cambiaDeColor', ['color']),
			new Method('moveteA', ['posX', 'posY']),
		]),
	)
}

export function ProjectProvider(props: { children: OneOrMany<JSX.Element> }) {
	const project = new Project()
	// TODO: For app testing
	testSeed(project)

	const addEntity = (newEntity: Entity) => project.addEntity(newEntity)

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
