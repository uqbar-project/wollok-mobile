import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Describe, Package } from 'wollok-ts/dist/model'
import FabAddScreen from '../../components/FabScreens/FabAddScreen'
import DescribeItem from '../../components/tests/DescribeItem'
import NewDescribeModal from '../../components/tests/NewDescribeModal'
import { useProject } from '../../context/ProjectProvider'
import { localCompareByProperty, sortWithoutEffect } from '../../utils/commons'

export function Describes() {
	const {
		project,
		actions: { addDescribe },
	} = useProject()

	const [modalVisible, setModalVisible] = useState(false)

	function fabPressed() {
		setModalVisible(true)
	}

	return (
		<FabAddScreen onPress={fabPressed}>
			<ScrollView>
				{sortWithoutEffect(
					project.getNodeByFQN<Package>('tests').members,
					localCompareByProperty('name'),
				).map(describe => (
					<DescribeItem key={describe.id} describe={describe as Describe} />
				))}
			</ScrollView>
			<NewDescribeModal
				visible={modalVisible}
				addDescribe={addDescribe}
				setVisible={setModalVisible}
			/>
		</FabAddScreen>
	)
}
