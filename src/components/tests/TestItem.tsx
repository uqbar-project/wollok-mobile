import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Divider, IconButton, List, withTheme } from 'react-native-paper'
import { Test } from 'wollok-ts/dist/model'
import { useProject } from '../../context/ProjectProvider'
import { HomeScreenNavigationProp } from '../../pages/Home'
import { Theme } from '../../theme'
import { runAsync } from '../../utils/commons'
import { wTranslate } from '../../utils/translation/translation-helpers'
import { Maybe } from '../../utils/type-helpers'
import { TestRun } from '../../utils/wollok-helpers'
import { ProblemReporterButton } from '../problems/ProblemReporterButton'
import ExceptionModal from '../ui/ExceptionModal'
import { TextFormModal } from '../ui/FormModal/TextFormModal'
import LoadingIconButton from '../ui/LoadingIconButton'
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
	const navigation = useNavigation<HomeScreenNavigationProp>()

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
						{testRun?.exception && (
							<IconButton
								color={theme.colors.error}
								icon={'alert-outline'}
								onPress={() => {
									setShowMessage(true)
								}}
							/>
						)}
						<LoadingIconButton
							loading={running}
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
						<IconButton
							icon={'bug'}
							onPress={() => {
								navigation.navigate('Debugger', {
									fqn: test.fullyQualifiedName(),
								})
							}}
						/>
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

			<ExceptionModal
				exception={testRun?.exception}
				visible={showMessage}
				setVisible={setShowMessage}
			/>
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

export default withTheme(TestItem)
