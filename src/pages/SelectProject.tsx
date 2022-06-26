import { useIsFocused, useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import { upperCaseFirst } from 'upper-case-first'
import { Environment } from 'wollok-ts/dist/model'
import MultiFabScreen from '../components/FabScreens/MultiFabScreen'
import { ProjectItem } from '../components/projects/ProjectItem'
import { TextFormModal } from '../components/ui/FormModal/TextFormModal'
import { LoadingScreen } from '../components/ui/LoadingScreen'
import { templateProject } from '../context/initialProject'
import { useProject } from '../context/ProjectProvider'
import {
	loadProject,
	savedProjects,
	saveProject,
} from '../services/persistance.service'
import { log } from '../utils/commons'
import { wTranslate } from '../utils/translation/translation-helpers'
import { HomeScreenNavigationProp } from './Home'

export function SelectProject() {
	const {
		actions: { setNewProject },
	} = useProject()
	const [projects, setProjects] = useState<string[]>([])
	const [showNewProjectModal, setShowNewProjectModal] = useState(false)
	const focused = useIsFocused()
	const [loadingProject, setLoadingProject] = useState(false)
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
			setLoadingProject(true)
			loadProject(projectName)
				.then(project => navigate(project))
				.finally(() => setLoadingProject(false))
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
		<MultiFabScreen
			actions={[
				{
					icon: 'file-download',
					label: upperCaseFirst(wTranslate('selectProject.load')),
					onPress: () => DocumentPicker.pick().then(log),
				},
				{
					icon: 'open-in-new',
					label: upperCaseFirst(wTranslate('selectProject.new')),
					onPress: () => setShowNewProjectModal(true),
				},
			]}>
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
			<TextFormModal
				title={wTranslate('project.newProject')}
				visible={showNewProjectModal}
				setVisible={setShowNewProjectModal}
				onSubmit={newProject}
			/>
			{loadingProject && <LoadingScreen />}
		</MultiFabScreen>
	)
}
