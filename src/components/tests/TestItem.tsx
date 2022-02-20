import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import {
	ActivityIndicator,
	Divider,
	IconButton,
	List,
	Text,
	withTheme,
} from 'react-native-paper'
import { Test } from 'wollok-ts/dist/model'
import { useProject } from '../../context/ProjectProvider'
import { EntityMemberScreenNavigationProp } from '../../pages/EntityMemberDetail'
import { Theme } from '../../theme'
import { runAsync } from '../../utils/commons'
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
	const [running, setRunning] = useState(false)
	const [showMessage, setShowMessage] = useState<boolean>(false)
	const navigator = useNavigation<EntityMemberScreenNavigationProp>()
	const color = testRun
		? styleByTestResult(testRun.result, theme)
		: theme.colors.disabled

	return (
		<>
			<List.Item
				title={test.name}
				left={() => <IconButton icon={'flask'} />}
				right={() => (
					<>
						{testRun?.exception?.message && (
							<IconButton
								color={theme.colors.error}
								icon={'alert-outline'}
								onPress={() => {
									setShowMessage(true)
								}}
							/>
						)}
						{running ? (
							<ActivityIndicator style={style.spinner} animating={true} />
						) : (
							<IconButton
								color={color}
								icon={'play-circle'}
								onPress={() => {
									setRunning(true)
									runAsync(() => {
										setTestRun(runTest(test))
										setRunning(false)
									})
								}}
							/>
						)}
					</>
				)}
				onPress={() =>
					navigator.navigate('EntityMemberDetails', {
						entityMember: test,
						fqn: test.fullyQualifiedName(),
					})
				}
			/>
			<Divider />
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
			return theme.colors.success
		case 'Failure':
			return theme.colors.failure
		case 'Error':
			return theme.colors.error
	}
}

const style = StyleSheet.create({
	spinner: {
		marginRight: 10,
	},
})

export default withTheme(TestItem)
