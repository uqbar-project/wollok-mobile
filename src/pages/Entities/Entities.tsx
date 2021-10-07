import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { RootStackParamList } from '../../App'
import EntityComponent from '../../components/entities/Entity/Entity'
import NewEntityModal from '../../components/entities/NewEntityModal/NewEntityModal'
import FabAddScreen from '../../components/FabScreens/FabAddScreen'
import { Entity } from '../../models/entity'

export type EntitiesScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Entities'
>

export function Entities() {
	const [entities, setEntities] = useState<Entity[]>([])
	const [modalVisible, setModalVisible] = useState(false)

	function fabPressed() {
		setModalVisible(true)
	}

	function addEntity(entity: Entity) {
		setEntities([...entities, entity])
	}

	return (
		<FabAddScreen onPress={fabPressed}>
			<ScrollView>
				{entities.map(ent => (
					<EntityComponent key={ent.name} entity={ent} />
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
