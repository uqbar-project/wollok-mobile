import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Module } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../../App'
import EntityComponent from '../../components/entities/Entity/Entity'
import NewEntityModal from '../../components/entities/NewEntityModal/NewEntityModal'
import FabAddScreen from '../../components/FabScreens/FabAddScreen'
import { useProject } from '../../context/ProjectProvider'

export type EntitiesScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Entities'
>

export function Entities() {
	const {
		project,
		actions: { addEntity },
	} = useProject()
	//TODO: Este booleano no debería estar en FabAddScreen?
	const [modalVisible, setModalVisible] = useState(false)

	function fabPressed() {
		setModalVisible(true)
	}

	return (
		<FabAddScreen onPress={fabPressed}>
			<ScrollView>
				{project.members.map(ent => (
					<EntityComponent key={ent.name} entity={ent as Module} />
				))}
			</ScrollView>
			<NewEntityModal
				visible={modalVisible}
				addEntity={addEntity}
				setVisible={setModalVisible}
			/>
		</FabAddScreen>
	)
}
