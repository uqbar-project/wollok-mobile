import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Test } from 'wollok-ts/dist/model'
import { useEntity } from '../../context/EntityProvider'
import { wTranslate } from '../../utils/translation-helpers'
import MultiFabScreen from '../FabScreens/MultiFabScreen'
import NewTestModal from './NewTestModal'
import TestItem from './TestItem'

export const Tests = function () {
	const [testModalVisible, setTestModalVisible] = useState(false)
	const { entity } = useEntity()
	const tests = entity.members as Test[]

	return (
		<MultiFabScreen
			actions={[
				{
					icon: 'test-tube',
					label: upperCaseFirst(wTranslate('tests.newTest')),
					onPress: () => setTestModalVisible(true),
				},
			]}>
			<List.Section>
				<ScrollView>
					{tests.map(test => (
						<TestItem key={test.id} item={test} />
					))}
				</ScrollView>
			</List.Section>
			<NewTestModal
				visible={testModalVisible}
				setVisible={setTestModalVisible}
			/>
		</MultiFabScreen>
	)
}
