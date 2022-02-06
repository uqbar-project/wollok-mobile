import React, { createContext, useState } from 'react'
import 'react-native-get-random-values'
import { ExecutionDirector } from 'wollok-ts/dist/interpreter/interpreter'
import link from 'wollok-ts/dist/linker'
import {
	Describe,
	Entity,
	Environment,
	Import,
	Module,
	Name,
	Package,
	Reference,
	Test,
} from 'wollok-ts/dist/model'
import { ParentComponentProp } from '../utils/type-helpers'
import { executionFor, interpretTest, TestRun } from '../utils/wollok-helpers'
import { createContextHook } from './create-context-hook'

export const mainPackageName = 'main'

export const ProjectContext = createContext<{
	project: Environment
	name: string
	actions: Actions
} | null>(null)

type Actions = {
	addEntity: (module: Module) => void
	addDescribe: (test: Describe) => void
	rebuildEnvironment: (entity: Entity) => void
	runTest: (test: Test) => TestRun
	execution: (test: Test) => ExecutionDirector<void>
}

export function ProjectProvider(
	props: ParentComponentProp<{
		projectName: string
		initialProject: Environment
	}>,
) {
	const [project, setProject] = useState<Environment>(
		link(props.initialProject.members),
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

	function execution(test: Test) {
		return executionFor(test, project)
	}

	const initialContext = {
		project,
		name: props.projectName,
		actions: { addEntity, addDescribe, rebuildEnvironment, runTest, execution },
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
