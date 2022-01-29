import React, { createContext, useState } from 'react'
import 'react-native-get-random-values'
import link from 'wollok-ts/dist/linker'
import {
	Describe,
	Entity,
	Environment,
	fromJSON,
	Import,
	Module,
	Name,
	Package,
	Reference,
	Test,
} from 'wollok-ts/dist/model'
import WRE from 'wollok-ts/dist/wre/wre.json'
import { ParentComponentProp } from '../utils/type-helpers'
import { interpretTest, TestRun } from '../utils/wollok-helpers'
import { createContextHook } from './create-context-hook'
import { mainDescribe, mainModules } from './initialProject'

export const mainPackageName = 'main'

export const ProjectContext = createContext<{
	project: Environment
	actions: Actions
} | null>(null)

type Actions = {
	addEntity: (module: Module) => void
	addDescribe: (test: Describe) => void
	rebuildEnvironment: (entity: Entity) => void
	runTest: (test: Test) => TestRun
}

export function ProjectProvider(props: ParentComponentProp) {
	const [project, setProject] = useState<Environment>(
		buildEnvironment(
			'tests',
			[mainDescribe],
			buildEnvironment(
				mainPackageName,
				mainModules,
				fromJSON<Environment>(WRE),
			),
		),
	)

	function buildEnvironment(
		name: Name,
		members: Entity[],
		base?: Environment,
	): Environment {
		const mainImport =
			name !== mainPackageName
				? [
						new Import({
							entity: new Reference({ name: mainPackageName }),
							isGeneric: true,
						}),
				  ]
				: undefined
		const pack = new Package({ name, members, imports: mainImport })
		return link([pack], base ?? project)
	}

	function addEntity(newEntity: Module) {
		rebuildEnvironment(newEntity)
	}

	function addDescribe(newDescribe: Describe) {
		rebuildEnvironment(newDescribe)
	}

	function rebuildEnvironment(entity: Entity) {
		const packageName = entity.is('Describe') ? 'tests' : mainPackageName
		setProject(buildEnvironment(packageName, [entity]))
		//TODO: Run validations
	}

	function runTest(test: Test) {
		return interpretTest(test, project)
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

export const useProject = createContextHook(ProjectContext, {
	hookName: 'useProject',
	contextName: 'ProjectProvider',
})
