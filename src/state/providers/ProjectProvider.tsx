import React, { createContext, useReducer } from 'react'
import { Project } from '../../models/project'
import { OneOrMany } from '../../utils/type-helpers'
import { projectReducer } from '../actions/project.reducer'

type ProjectDispatch = React.Dispatch<Parameters<typeof projectReducer>[1]>

export const ProjectContext = createContext<
	{ state: Project; dispatch: ProjectDispatch } | undefined
>(undefined)

export function ProjectProvider(props: { children: OneOrMany<JSX.Element> }) {
	const initialValue: Project = []
	const [state, dispatch] = useReducer(projectReducer, initialValue)
	const value = { state, dispatch }
	return (
		<ProjectContext.Provider value={value}>
			{props.children}
		</ProjectContext.Provider>
	)
}

export function useProject() {
	const context = React.useContext(ProjectContext)
	if (context === undefined) {
		throw new Error('useProject must be used within a ProjectProvider')
	}
	return context
}
