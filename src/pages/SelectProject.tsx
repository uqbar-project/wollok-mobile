import { useIsFocused, useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Environment } from 'wollok-ts/dist/model'
import FabAddScreen from '../components/FabScreens/FabAddScreen'
import { ProjectFormModal } from '../components/projects/ProjectFormModal'
import { ProjectItem } from '../components/projects/ProjectItem'
import { templateProject } from '../context/initialProject'
import { useProject } from '../context/ProjectProvider'
import {
	loadProject,
	savedProjects,
	saveProject,
} from '../services/persistance.service'
import { wTranslate } from '../utils/translation-helpers'
import { HomeScreenNavigationProp } from './Home'

export function SelectProject() {
	const {
		actions: { setNewProject },
	} = useProject()
	const [projects, setProjects] = useState<string[]>([])
	const [showNewProjectModal, setShowNewProjectModal] = useState(false)
	const focused = useIsFocused()
	const navigation = useNavigation<HomeScreenNavigationProp>()

	function navigateToProject(
		projectName: string,
		selectedProject?: Environment,
	) {
		function navigate(targetProject: Environment) {
			setNewProject(projectName, targetProject)
			navigation.navigate('Home')
		}
		if (selectedProject) {
			navigate(selectedProject)
		} else {
			loadProject(projectName).then(project => {
				navigate(project)
			})
		}
	}

	function newProject(newProjectName: string) {
		const project = templateProject()
		saveProject(newProjectName, project).then(() => {
			navigateToProject(newProjectName, project)
		})
	}

	useEffect(() => {
		if (focused) {
			refresh()
		}
	}, [setProjects, navigation, focused])

	function refresh() {
		savedProjects().then(setProjects)
	}

	return (
		<FabAddScreen onPress={() => setShowNewProjectModal(true)}>
			<ScrollView>
				{projects.map((p, i) => (
					<ProjectItem
						project={p}
						key={i}
						navigateToProject={navigateToProject}
						onDelete={refresh}
						onRename={refresh}
					/>
				))}
			</ScrollView>
			<ProjectFormModal
				title={wTranslate('project.newProject')}
				visible={showNewProjectModal}
				setVisible={setShowNewProjectModal}
				onSubmit={newProject}
			/>
		</FabAddScreen>
	)
}
