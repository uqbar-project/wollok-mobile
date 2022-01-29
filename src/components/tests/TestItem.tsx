import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { IconButton, List, Text, withTheme } from 'react-native-paper'
import { Test } from 'wollok-ts/dist/model'
import { useProject } from '../../context/ProjectProvider'
import { EntityMemberScreenNavigationProp } from '../../pages/EntityMemberDetail'
import { Theme } from '../../theme'
import { Maybe } from '../../utils/type-helpers'
import { TestResult, TestRun } from '../../utils/wollok-helpers'
import FormModal from '../ui/FormModal/FormModal'

type TestItemProps = {
	item: Test
	theme: Theme
}
function TestItem({ item: test, theme }: TestItemProps) {
	const {
		actions: { runTest },
	} = useProject()
	const [testRun, setTestRun] = useState<Maybe<TestRun>>(undefined)
	const [showMessage, setShowMessage] = useState<boolean>(false)
	const navigator = useNavigation<EntityMemberScreenNavigationProp>()
	const { icon, color } = testRun
		? styleByTestResult(testRun.result, theme)
		: { icon: 'test-tube-empty', color: theme.colors.disabled }

	return (
		<>
			<List.Item
				title={test.name}
				left={() => (
					<IconButton
						color={color}
						icon={icon}
						onPress={() => {
							setTestRun(runTest(test))
						}}
					/>
				)}
				right={() =>
					testRun?.exception?.message && (
						<IconButton
							color={theme.colors.error}
							icon={'alert-outline'}
							onPress={() => {
								setShowMessage(true)
							}}
						/>
					)
				}
				onPress={() =>
					navigator.navigate('EntityMemberDetails', {
						entityMember: test,
						fqn: test.fullyQualifiedName(),
					})
				}
			/>
			<FormModal
				visible={showMessage}
				title={testRun?.exception?.name}
				setVisible={setShowMessage}
				onSubmit={() => setShowMessage(false)}>
				<Text>{testRun?.exception?.message}</Text>
			</FormModal>
		</>
	)
}

function styleByTestResult(result: TestResult, theme: Theme) {
	switch (result) {
		case 'Passed':
			return { icon: 'test-tube', color: theme.colors.success }
		case 'Failure':
			return { icon: 'test-tube-off', color: theme.colors.failure }
		case 'Error':
			return { icon: 'test-tube-off', color: theme.colors.error }
	}
}

export default withTheme(TestItem)
