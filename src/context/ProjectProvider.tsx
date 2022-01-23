import React, { createContext, useContext, useState } from 'react'
import 'react-native-get-random-values'
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
import { OneOrMany } from '../utils/type-helpers'

export const ProjectContext = createContext<{
	project: Environment
	actions: Actions
} | null>(null)

type Actions = {
	addEntity: (entity: Module) => void
	rebuildEnvironment: (...members: Entity[]) => void
}

const pepita = new Singleton({
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
})

function testMainEntities() {
	return [
		pepita,
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
	const [project, setProject] = useState<Environment>(
		buildEnvironment(testMainEntities(), fromJSON<Environment>(WRE)),
	)

	function buildEnvironment(
		members: Entity[],
		base?: Environment,
	): Environment {
		const mainPackage = new Package({ name: 'main', members })
		return link([mainPackage], base ?? project)
	}

	function addEntity(newEntity: Module) {
		rebuildEnvironment(newEntity)
	}

	function rebuildEnvironment(...members: Entity[]) {
		setProject(buildEnvironment(members))
		//TODO: Run validations
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
