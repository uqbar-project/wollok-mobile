import React, { createContext, useContext } from 'react'
import {
	Body,
	Field,
	Literal,
	Method,
	Module,
	Package,
	Parameter,
	Singleton,
} from 'wollok-ts/dist/model'
import { Mutable, OneOrMany } from '../utils/type-helpers'

export type Project = Mutable<Package>

export const ProjectContext = createContext<{
	project: Project
	actions: Actions
} | null>(null)

type Actions = {
	addEntity: (entity: Module) => void
}

function testMainPackage() {
	return new Package({
		name: 'main',
		members: [
			new Singleton({
				name: 'pepita',
				members: [
					new Field({
						name: 'energia',
						isConstant: false,
						isProperty: true,
						value: new Literal({ value: 100 }),
					}),
					new Field({
						name: 'nombre',
						isConstant: true,
						isProperty: true,
						value: new Literal({ value: 'Pepita' }),
					}),
					new Method({
						name: 'vola',
						parameters: [
							new Parameter({
								name: 'kms',
							}),
						],
						body: new Body(),
					}),
				],
			}),
			new Singleton({
				name: 'manolo',
				members: [
					new Method({
						name: 'cambiaDeColor',
						parameters: [
							new Parameter({
								name: 'color',
							}),
						],
						body: new Body(),
					}),
					new Method({
						name: 'moveteA',
						parameters: [
							new Parameter({
								name: 'posX',
							}),
							new Parameter({
								name: 'posY',
							}),
						],
						body: new Body(),
					}),
				],
			}),
		],
	})
}

export function ProjectProvider(props: { children: OneOrMany<JSX.Element> }) {
	const project: Project = testMainPackage()

	const addEntity = (newEntity: Module) => {
		project.members = [...project.members, newEntity]
	}

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
