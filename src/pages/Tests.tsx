import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Package, Test } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import FabAddScreen from '../components/FabScreens/FabAddScreen'
import NewTestModal from '../components/tests/NewTestModal'
import TestItem from '../components/tests/TestItem'
import { useProject } from '../context/ProjectProvider'

export type TestsScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Tests'
>

export function Tests() {
	const {
		project,
		actions: { addTest },
	} = useProject()

	const [modalVisible, setModalVisible] = useState(false)

	function fabPressed() {
		setModalVisible(true)
	}

	return (
		<FabAddScreen onPress={fabPressed}>
			<ScrollView>
				{project.getNodeByFQN<Package>('tests').members.map(test => (
					<TestItem key={test.id} test={test as Test} />
				))}
			</ScrollView>
			<NewTestModal
				visible={modalVisible}
				addTest={addTest}
				setVisible={setModalVisible}
			/>
		</FabAddScreen>
	)
}
