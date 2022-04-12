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
import { Theme } from '../../theme'
import { runAsync } from '../../utils/commons'
import { Maybe } from '../../utils/type-helpers'
import { TestRun } from '../../utils/wollok-helpers'
import { ProblemReporterButton } from '../problems/ProblemReporterButton'
import FormModal from '../ui/FormModal/FormModal'

type TestItemProps = {
	item: Test
	runner: (test: Test) => TestRun
	onClick: () => void
	theme: Theme
}
function TestItem({ item: test, runner, onClick, theme }: TestItemProps) {
	const [testRun, setTestRun] = useState<Maybe<TestRun>>(undefined)
	const [running, setRunning] = useState(false)
	const [showMessage, setShowMessage] = useState<boolean>(false)

	return (
		<>
			<List.Item
				title={test.name}
				left={() => (
					<>
						<ProblemReporterButton node={test} />
						<IconButton icon={'flask'} />
					</>
				)}
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
								color={colorForTestRun(testRun, theme)}
								icon={'play-circle'}
								onPress={() => {
									setRunning(true)
									runAsync(() => {
										setTestRun(runner(test))
										setRunning(false)
									})
								}}
							/>
						)}
					</>
				)}
				onPress={onClick}
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

function colorForTestRun(testRun: Maybe<TestRun>, theme: Theme) {
	if (!testRun) {
		return theme.colors.disabled
	}

	switch (testRun.result) {
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
