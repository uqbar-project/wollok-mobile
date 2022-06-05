import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { upperCaseFirst } from 'upper-case-first'
import { Describe, is, Test } from 'wollok-ts/dist/model'
import { useProject } from '../../context/ProjectProvider'
import { EditorScreenNavigationProp } from '../../pages/Editor'
import { localCompareByProperty } from '../../utils/commons'
import { wTranslate } from '../../utils/translation/translation-helpers'
import MultiFabScreen from '../FabScreens/MultiFabScreen'
import NewTestModal from './NewTestModal'
import TestItem from './TestItem'

export type TestsProps = {
	describe: Describe
}

export const Tests = function ({ describe }: TestsProps) {
	const [testNewModalVisible, setTestNewModalVisible] = useState(false)
	const {
		actions: { runTest, addMember },
	} = useProject()
	const tests = describe.members.filter(is('Test')) as Test[]

	const navigator = useNavigation<EditorScreenNavigationProp>()
	function navigateTo(test: Test) {
		navigator.navigate('Editor', {
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
				{tests.sort(localCompareByProperty('name')).map(test => (
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
				addNewTest={addMember(describe)}
			/>
		</MultiFabScreen>
	)
}
