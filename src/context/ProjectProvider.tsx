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
	Problem,
	Reference,
	Test,
} from 'wollok-ts/dist/model'
import validate from 'wollok-ts/dist/validator'
import { saveProject } from '../services/persistance.service'
import { ParentComponentProp } from '../utils/type-helpers'
import { executionFor, interpretTest, TestRun } from '../utils/wollok-helpers'
import { createContextHook } from './create-context-hook'

export const mainPackageName = 'main'
export const testsPackageName = 'tests'

export const ProjectContext = createContext<{
	project: Environment
	name: string
	changed: boolean
	problems: Problem[]
	actions: Actions
} | null>(null)

type Actions = {
	addEntity: (module: Module) => void
	addDescribe: (test: Describe) => void
	rebuildEnvironment: (entity: Entity) => void
	runTest: (test: Test) => TestRun
	execution: (test: Test) => ExecutionDirector<void>
	save: () => Promise<unknown>
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
	const [changed, setChanged] = useState(false)
	const [problems, setProblems] = useState(
		validateProject(project) as Problem[],
	)

	/////////////////////////////////// BUILD //////////////////////////////////

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
		const packageName = entity.is('Describe')
			? testsPackageName
			: mainPackageName
		const newProject = buildEnvironment(packageName, [entity])
		setProject(newProject)
		setProblems(validateProject(newProject) as Problem[])
		setChanged(true)
	}

	function validateProject(_project: Environment) {
		const targetPackages = [
			project.getNodeByFQN(mainPackageName),
			project.getNodeByFQN(testsPackageName),
		]
		const belongsToTargetProject = (p: Problem) =>
			targetPackages.some(target => p.node.ancestors().includes(target))

		return validate(_project).filter(belongsToTargetProject)
	}

	/////////////////////////////////// BUILD //////////////////////////////////

	/////////////////////////////////// EXECUTION //////////////////////////////////

	function runTest(test: Test) {
		return interpretTest(test, project)
	}

	function execution(test: Test) {
		return executionFor(test, project)
	}

	/////////////////////////////////// EXECUTION //////////////////////////////////

	async function save() {
		await saveProject(props.projectName, project)
		setChanged(false)
	}

	const initialContext = {
		project,
		name: props.projectName,
		changed,
		problems,
		actions: {
			addEntity,
			addDescribe,
			rebuildEnvironment,
			runTest,
			execution,
			save,
		},
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
