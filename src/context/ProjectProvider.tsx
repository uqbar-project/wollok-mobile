import 'react-native-get-random-values'
import React, { createContext, useContext } from 'react'
import link from 'wollok-ts/dist/linker'
import {
	Body,
	Entity,
	Environment,
	Field,
	fromJSON,
	Literal,
	Method,
	Module,
	Package,
	Parameter,
	Singleton,
} from 'wollok-ts/dist/model'
import WRE from 'wollok-ts/dist/wre/wre.json'
import { Mutable, OneOrMany } from '../utils/type-helpers'

export const ProjectContext = createContext<{
	project: Environment
	actions: Actions
} | null>(null)

type Actions = {
	addEntity: (entity: Module) => void
	rebuildEnvironment: () => void
}

function testMainEntities() {
	return [
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
					name: 'estaCansada',
					body: new Body(),
				}),
				new Method({
					name: 'vola',
					body: new Body(),
				}),
				new Method({
					name: 'come',
					parameters: [
						new Parameter({
							name: 'comida',
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
	]
}

export function ProjectProvider(props: { children: OneOrMany<JSX.Element> }) {
	const entities: Entity[] = testMainEntities()

	const addEntity = (newEntity: Module) => {
		entities.push(newEntity)
	}

	const buildEnvironment = () => {
		const baseEnvironment = fromJSON<Environment>(WRE)
		const mainPackage = new Package({ name: 'main', members: entities })
		return link([mainPackage], baseEnvironment)
	}

	const project = buildEnvironment()

	const rebuildEnvironment = () => {
		const newEnvironment = buildEnvironment()
		;(project as Mutable<Environment>).members = newEnvironment.members
	}

	const initialContext = { project, actions: { addEntity, rebuildEnvironment } }
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
