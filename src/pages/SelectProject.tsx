import { useIsFocused, useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { List } from 'react-native-paper'
import { Environment } from 'wollok-ts/dist/model'
import { stylesheet } from '../components/entities/Entity/styles'
import FabAddScreen from '../components/FabScreens/FabAddScreen'
import { NewProjectModal } from '../components/select-project/NewProjectModal'
import { templateProject } from '../context/initialProject'
import {
	loadProject,
	savedProjects,
	saveProject,
} from '../services/persistance.service'
import { useTheme } from '../theme'

export function SelectProject() {
	const [projects, setProjects] = useState<string[]>([])
	const [showNewProjectModal, setShowNewProjectModal] = useState(false)
	const focused = useIsFocused()
	const navigation = useNavigation()

	const theme = useTheme()

	const styles = stylesheet(theme)

	function navigateToProject(
		projectName: string,
		selectedPorject?: Environment,
	) {
		loadProject(projectName).then(project => {
			navigation.navigate('ProjectNavigator', {
				name: projectName,
				project: selectedPorject ?? project,
			})
		})
	}

	function newProject(newProjectName: string) {
		const project = templateProject()
		saveProject(newProjectName, project).then(() => {
			navigateToProject(newProjectName, project)
		})
	}

	useEffect(() => {
		if (focused) {
			savedProjects().then(setProjects)
		}
	}, [setProjects, navigation, focused])

	return (
		<FabAddScreen onPress={() => setShowNewProjectModal(true)}>
			<ScrollView>
				<>
					{projects.map(p => (
						<List.Item
							key={p}
							onPress={() => navigateToProject(p)}
							title={p}
							style={styles.item}
							titleStyle={styles.itemTitle}
						/>
					))}
				</>
			</ScrollView>
			<NewProjectModal
				visible={showNewProjectModal}
				setVisible={setShowNewProjectModal}
				onSubmit={newProject}
			/>
		</FabAddScreen>
	)
}
