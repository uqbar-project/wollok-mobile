import { useIsFocused, useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView } from 'react-native'
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
	FILE_PREFIX,
	loadProject,
	savedProjects,
	saveProject,
	withoutExtension,
	WollokProjectDescriptor,
} from '../services/persistance.service'
import { wTranslate } from '../utils/translation/translation-helpers'
import { HomeScreenNavigationProp } from './Home'

export function SelectProject() {
	const focused = useIsFocused()
	const {
		actions: { setNewProject },
	} = useProject()
	const [projects, setProjects] = useState<WollokProjectDescriptor[]>([])
	const [showNewProjectModal, setShowNewProjectModal] = useState(false)
	const [loadingProject, setLoadingProject] = useState(false)
	const navigation = useNavigation<HomeScreenNavigationProp>()

	function navigateToProject(
		projectDescriptor: WollokProjectDescriptor,
		selectedProject?: Environment,
	) {
		function navigate(targetProject: Environment) {
			setNewProject(projectDescriptor, targetProject)
			navigation.navigate('Home')
		}
		if (selectedProject) {
			navigate(selectedProject)
		} else {
			setLoadingProject(true)
			loadProject(projectDescriptor.url)
				.then(project => navigate(project))
				.finally(() => setLoadingProject(false))
		}
	}

	function newProject(newProjectName: string) {
		const project = templateProject()
		saveProject(newProjectName, project).then(projectDesc => {
			navigateToProject(projectDesc, project)
		})
	}

	async function importProject(descriptor: WollokProjectDescriptor) {
		setLoadingProject(true)
		const project = await loadProject(descriptor.url)
		const newDesciptor = await saveProject(descriptor.name, project)
		navigateToProject(newDesciptor, project)
		setLoadingProject(false)
	}

	async function pickProjectFromFS() {
		const files = await DocumentPicker.pick()
		const { name, uri } = files[0]
		const newDescriptor = {
			name: withoutExtension(name),
			url: uri.replace(FILE_PREFIX, ''),
		}

		if (projects.some(desc => desc.name === newDescriptor.name)) {
			Alert.alert(
				wTranslate('project.nameAlreadyExist', newDescriptor),
				wTranslate('project.youWillOverrideIt'),
				[
					{ text: wTranslate('cancel'), style: 'cancel', onPress: () => {} },
					{
						text: wTranslate('override'),
						style: 'destructive',
						onPress: () => importProject(newDescriptor),
					},
				],
			)
		} else {
			importProject(newDescriptor)
		}
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
					label: upperCaseFirst(wTranslate('project.load')),
					onPress: pickProjectFromFS,
				},
				{
					icon: 'open-in-new',
					label: upperCaseFirst(wTranslate('project.new')),
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
				title={wTranslate('project.new')}
				visible={showNewProjectModal}
				setVisible={setShowNewProjectModal}
				onSubmit={newProject}
			/>
			{loadingProject && <LoadingScreen />}
		</MultiFabScreen>
	)
}
