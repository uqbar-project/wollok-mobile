import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Module, Package } from 'wollok-ts/dist/model'
import EntityComponent from '../../components/entities/Entity/Entity'
import NewEntityModal from '../../components/entities/NewEntityModal/NewEntityModal'
import FabAddScreen from '../../components/FabScreens/FabAddScreen'
import { mainPackageName, useProject } from '../../context/ProjectProvider'
import { sortWithoutEffect } from '../../utils/commons'

export function Modules() {
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
				{sortWithoutEffect(
					project.getNodeByFQN<Package>(mainPackageName).members,
					(a, b) => a.name!.localeCompare(b.name!),
				).map(ent => (
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
