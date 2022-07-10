import React from 'react'
import { Environment, Problem } from 'wollok-ts/dist/model'
import { ProjectContext } from '../../context/ProjectProvider'
import { ParentComponentProp } from '../../utils/type-helpers'
import { executionFor } from '../../utils/wollok-helpers'
import { project } from './wollokProject'

export const initialContext = {
	project: new Environment({ members: [] }),
	name: 'Project Test',
	url: 'FAKE_URL',
	changed: false,
	problems: [] as Problem[],
	actions: {
		setNewProject: jest.fn(),
		addEntity: jest.fn(),
		addDescribe: jest.fn(),
		addMember: jest.fn(),
		deleteMember: jest.fn(),
		editEntity: jest.fn(),
		deleteEntity: jest.fn(),
		changeMember: jest.fn(),
		rebuildEnvironment: jest.fn(),
		runTest: jest.fn(),
		execution: jest.fn(),
		save: jest.fn(),
		newInterpreter: () => executionFor(project),
	},
}

type InitialProject = Partial<typeof initialContext>

const ProjectProviderMock = ({
	children,
	...props
}: ParentComponentProp<InitialProject>) => {
	return (
		<ProjectContext.Provider value={Object.assign(initialContext, props)}>
			{children}
		</ProjectContext.Provider>
	)
}

export default ProjectProviderMock
