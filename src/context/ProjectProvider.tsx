import React, { createContext, useState } from 'react'
import 'react-native-get-random-values'
import { ExecutionDirector } from 'wollok-ts/dist/interpreter/interpreter'
import { fromJSON } from 'wollok-ts/dist/jsonUtils'
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
import WRE from 'wollok-ts/dist/wre/wre.json'
import { saveProject } from '../services/persistance.service'
import { ParentComponentProp } from '../utils/type-helpers'
import {
	EntityMember,
	executionFor,
	interpretTest,
	TestRun,
} from '../utils/wollok-helpers'
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
	setNewProject: (name: Name, project: Environment) => void
	rebuildEnvironment: (entity: Entity) => void
	addEntity: (module: Module) => void
	editEntity: (oldModule: Module, newModule: Module) => void
	deleteEntity: (module: Module) => void
	addDescribe: (test: Describe) => void
	addMember: (parent: Module) => (newMember: EntityMember) => void
	changeMember: (
		parent: Module,
	) => (oldMember: EntityMember, newMember: EntityMember) => void
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
	const [name, setName] = useState(props.projectName)
	const [project, setProject] = useState<Environment>(
		link(props.initialProject.members),
	)
	const [changed, setChanged] = useState(false)
	const [problems, setProblems] = useState(
		validateProject(project) as Problem[],
	)

	/////////////////////////////////// BUILD //////////////////////////////////

	function buildEnvironment(
		packageName: Name,
		members: Entity[],
		base?: Environment,
	): Environment {
		const mainImport =
			packageName !== mainPackageName
				? [
						new Import({
							entity: new Reference({ name: mainPackageName }),
							isGeneric: true,
						}),
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  ]
				: undefined
		const pack = new Package({
			name: packageName,
			members,
			imports: mainImport,
		})
		return link([pack], base ?? project)
	}

	function rebuildEnvironment(entity: Entity) {
		changeProject(_ => {
			const packageName = entity.is('Describe')
				? testsPackageName
				: mainPackageName
			return buildEnvironment(packageName, [entity])
		})
	}

	function validateProject(_project: Environment) {
		const targetPackages = [
			_project.getNodeByFQN(mainPackageName),
			_project.getNodeByFQN(testsPackageName),
		]
		const belongsToTargetProject = (p: Problem) =>
			targetPackages.some(target => p.node.ancestors().includes(target))

		return validate(_project).filter(belongsToTargetProject)
	}

	function changeProject(action: (project: Environment) => Environment) {
		const newProject = action(project)
		setProject(newProject)
		setChanged(true)
		setProblems(validateProject(newProject))
	}

	/////////////////////////////////// BUILD //////////////////////////////////

	/////////////////////////////////// ENTITIES //////////////////////////////////
	function setNewProject(newName: Name, _newProject: Environment) {
		const newProject = link(_newProject.members)
		setName(newName)
		setProject(newProject)
		setProblems(validateProject(newProject))
		setChanged(false)
	}

	function addEntity(newEntity: Module) {
		rebuildEnvironment(newEntity)
	}

	function deleteEntity(entity: Module) {
		changeProject(_ => {
			const newMembers = entity.parent.members.filter(
				member => member.fullyQualifiedName() !== entity.fullyQualifiedName(),
			)

			return link(
				[
					entity.parent.copy({ members: newMembers }),
					project.getNodeByFQN<Package>(testsPackageName),
				],
				fromJSON<Environment>(WRE),
			)
		})
	}

	function editEntity(entity: Module, newEntity: Module) {
		changeProject(_ => {
			const newMembers = entity.parent.members
				.filter(
					member => member.fullyQualifiedName() !== entity.fullyQualifiedName(),
				)
				.concat(newEntity)

			return link(
				[
					entity.parent.copy({ members: newMembers }),
					project.getNodeByFQN<Package>(testsPackageName),
				],
				fromJSON<Environment>(WRE),
			)
		})
	}

	function addDescribe(newDescribe: Describe) {
		rebuildEnvironment(newDescribe)
	}

	const addMember = (entity: Module) => (newMember: EntityMember) => {
		rebuildEnvironment(
			entity.copy({
				members: [...entity.members, newMember],
			}) as Module,
		)
	}

	const changeMember =
		(entity: Module) => (oldMember: EntityMember, newMember: EntityMember) => {
			rebuildEnvironment(
				entity.copy({
					members: [...entity.members.filter(m => m !== oldMember), newMember],
				}) as Module,
			)
		}

	/////////////////////////////////// ENTITIES //////////////////////////////////

	/////////////////////////////////// EXECUTION //////////////////////////////////

	function runTest(test: Test) {
		return interpretTest(test, project)
	}

	function execution(test: Test) {
		return executionFor(test, project)
	}

	/////////////////////////////////// EXECUTION //////////////////////////////////

	async function save() {
		await saveProject(name, project)
		setChanged(false)
	}

	const initialContext = {
		project,
		name,
		changed,
		problems,
		actions: {
			setNewProject,
			addEntity,
			deleteEntity,
			editEntity,
			addDescribe,
			addMember,
			changeMember,
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
