import React, { createContext, useContext, useState } from 'react'
import 'react-native-get-random-values'
import interpret from 'wollok-ts/dist/interpreter/interpreter'
import link from 'wollok-ts/dist/linker'
import {
	Describe,
	Entity,
	Environment,
	fromJSON,
	Module,
	Name,
	Package,
	Test,
} from 'wollok-ts/dist/model'
import WRE from 'wollok-ts/dist/wre/wre.json'
import WRENatives from 'wollok-ts/dist/wre/wre.natives'
import { OneOrMany } from '../utils/type-helpers'
import { mainDescribe, mainModules } from './initialProject'

export const ProjectContext = createContext<{
	project: Environment
	actions: Actions
} | null>(null)

type Actions = {
	addEntity: (module: Module) => void
	addDescribe: (test: Describe) => void
	rebuildEnvironment: (entity: Entity) => void
	runTest: (test: Test) => boolean
}

export function ProjectProvider(props: { children: OneOrMany<JSX.Element> }) {
	const [project, setProject] = useState<Environment>(
		buildEnvironment(
			'tests',
			[mainDescribe],
			buildEnvironment('main', mainModules, fromJSON<Environment>(WRE)),
		),
	)

	function buildEnvironment(
		name: Name,
		members: Entity[],
		base?: Environment,
	): Environment {
		const pack = new Package({ name, members })
		return link([pack], base ?? project)
	}

	function addEntity(newEntity: Module) {
		rebuildEnvironment(newEntity)
	}

	function addDescribe(newDescribe: Describe) {
		rebuildEnvironment(newDescribe)
	}

	function rebuildEnvironment(entity: Entity) {
		const packageName = entity.is('Describe') ? 'tests' : 'main'
		setProject(buildEnvironment(packageName, [entity]))
		//TODO: Run validations
	}

	function runTest(test: Test) {
		try {
			const interpreter = interpret(project, WRENatives)
			interpreter.exec(test)
			return true
		} catch (_) {
			//TODO: Feedback from error
			return false
		}
	}

	const initialContext = {
		project,
		actions: { addEntity, addDescribe, rebuildEnvironment, runTest },
	}
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
