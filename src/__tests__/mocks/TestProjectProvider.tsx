import React from 'react'
import { templateProject } from '../../context/initialProject'
import { ProjectProvider } from '../../context/ProjectProvider'
import { ParentComponentProp } from '../../utils/type-helpers'

const TestProjectProvider = ({ children }: ParentComponentProp<{}>) => (
	<ProjectProvider
		projectName={'TEST PROJECT'}
		initialProject={templateProject()}>
		{children}
	</ProjectProvider>
)

export default TestProjectProvider
