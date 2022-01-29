import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
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

	// TODO: Add a header button to run all tests
	// const navigation = useNavigation()
	// React.useLayoutEffect(() => {
	// 	navigation.setOptions({
	// 		headerRight: () => (
	// 			<SubmitCheckButton
	// 				onSubmit={() => {
	// 					props.onSubmit(expression!)
	// 				}}
	// 			/>
	// 		),
	// 	})
	// }, [navigation, expression, props])

	return (
		<MultiFabScreen
			actions={[
				{
					icon: 'flask',
					label: upperCaseFirst(wTranslate('tests.newTest')),
					onPress: () => setTestModalVisible(true),
				},
			]}>
			<ScrollView>
				{tests.map(test => (
					<TestItem key={test.id} item={test} />
				))}
			</ScrollView>
			<NewTestModal
				visible={testModalVisible}
				setVisible={setTestModalVisible}
			/>
		</MultiFabScreen>
	)
}
