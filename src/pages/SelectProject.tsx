import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { List } from 'react-native-paper'
import { stylesheet } from '../components/entities/Entity/styles'
import { loadProject, savedProjects } from '../services/persistance.service'
import { useTheme } from '../theme'

export function SelectProject() {
	const [projects, setProjects] = useState<string[]>([])

	const navigation = useNavigation()

	const theme = useTheme()

	const styles = stylesheet(theme)

	function navigateToProject(projectName: string) {
		loadProject(projectName).then(project => {
			navigation.navigate('ProjectNavigator', {
				name: projectName,
				project,
			})
		})
	}

	useEffect(() => {
		savedProjects().then(setProjects)
	}, [setProjects])

	return (
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
	)
}
