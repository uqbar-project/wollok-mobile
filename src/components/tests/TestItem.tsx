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
import { Theme } from '../../theme'
import { runAsync } from '../../utils/commons'
import { wTranslate } from '../../utils/translation/translation-helpers'
import { Maybe } from '../../utils/type-helpers'
import { TestRun } from '../../utils/wollok-helpers'
import { ProblemReporterButton } from '../problems/ProblemReporterButton'
import FormModal from '../ui/FormModal/FormModal'
import { TextFormModal } from '../ui/FormModal/TextFormModal'
import { CommonOptionsDialog } from '../ui/Options/CommonOptionsDialog'
import { optionsTitleFromName } from '../ui/Options/OptionsDialog'

type TestItemProps = {
	item: Test
	runner: (test: Test) => TestRun
	onClick: () => void
	theme: Theme
}
function TestItem({ item: test, runner, onClick, theme }: TestItemProps) {
	const {
		actions: { deleteMember, changeMember },
	} = useProject()
	const [testRun, setTestRun] = useState<Maybe<TestRun>>(undefined)
	const [renameModal, setRenameModal] = useState(false)
	const [running, setRunning] = useState(false)
	const [isOptionsVisible, setOptionsDialogVisible] = useState(false)
	const [showMessage, setShowMessage] = useState<boolean>(false)

	function onDelete() {
		deleteMember(test)
	}

	function onRename(name: string) {
		changeMember(test.parent)(test, test.copy({ name }))
	}

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
				onLongPress={() => setOptionsDialogVisible(true)}
			/>
			<Divider />
			<CommonOptionsDialog
				title={optionsTitleFromName(test.name)}
				actions={{
					delete: onDelete,
					rename: () => setRenameModal(true),
				}}
				visible={isOptionsVisible}
				dismiss={() => setOptionsDialogVisible(false)}
			/>

			<TextFormModal
				onSubmit={onRename}
				setVisible={setRenameModal}
				visible={renameModal}
				title={wTranslate('abm.rename')}
				currentText={test.name}
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
