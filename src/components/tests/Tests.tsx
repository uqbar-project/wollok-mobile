import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { upperCaseFirst } from 'upper-case-first'
import { is, Test } from 'wollok-ts/dist/model'
import { useEntity } from '../../context/EntityProvider'
import { useProject } from '../../context/ProjectProvider'
import { EntityMemberScreenNavigationProp } from '../../pages/EntityMemberDetail'
import { wTranslate } from '../../utils/translation-helpers'
import MultiFabScreen from '../FabScreens/MultiFabScreen'
import NewTestModal from './NewTestModal'
import TestItem from './TestItem'

export const Tests = function () {
	const [testNewModalVisible, setTestNewModalVisible] = useState(false)
	const {
		actions: { runTest },
	} = useProject()
	const { entity } = useEntity()
	const tests = entity.members.filter(is('Test')) as Test[]

	const navigator = useNavigation<EntityMemberScreenNavigationProp>()
	function navigateTo(test: Test) {
		navigator.navigate('EntityMemberDetails', {
			entityMember: test,
			fqn: test.fullyQualifiedName(),
		})
	}

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
					onPress: () => setTestNewModalVisible(true),
				},
			]}>
			<ScrollView>
				{tests.map(test => (
					<TestItem
						key={test.id}
						item={test}
						runner={runTest}
						onClick={() => navigateTo(test)}
					/>
				))}
			</ScrollView>
			<NewTestModal
				visible={testNewModalVisible}
				setVisible={setTestNewModalVisible}
			/>
		</MultiFabScreen>
	)
}
