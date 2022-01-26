import React, { createContext, useContext, useState } from 'react'
import 'react-native-get-random-values'
import link from 'wollok-ts/dist/linker'
import {
	Entity,
	Environment,
	fromJSON,
	Module,
	Package,
	Test,
} from 'wollok-ts/dist/model'
import WRE from 'wollok-ts/dist/wre/wre.json'
import { OneOrMany } from '../utils/type-helpers'
import { mainModules } from './initialProject'

export const ProjectContext = createContext<{
	project: Environment
	actions: Actions
} | null>(null)

type Actions = {
	addEntity: (module: Module) => void
	addTest: (test: Test) => void
	rebuildEnvironment: (modules: Module[], tests?: Test[]) => void
}

export function ProjectProvider(props: { children: OneOrMany<JSX.Element> }) {
	const [project, setProject] = useState<Environment>(
		buildEnvironment(mainModules, [], fromJSON<Environment>(WRE)),
	)

	function buildEnvironment(
		members: Entity[],
		tests?: Test[],
		base?: Environment,
	): Environment {
		const mainPackage = new Package({ name: 'main', members })
		const testsPackage = new Package({ name: 'tests', members: tests })
		return link([mainPackage, testsPackage], base ?? project)
	}

	function addEntity(newEntity: Module) {
		rebuildEnvironment([newEntity])
	}

	function addTest(newTest: Test) {
		rebuildEnvironment([], [newTest])
	}

	function rebuildEnvironment(members: Entity[], tests?: Test[]) {
		setProject(buildEnvironment(members, tests))
		//TODO: Run validations
	}

	const initialContext = {
		project,
		actions: { addEntity, addTest, rebuildEnvironment },
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
