import React, { useState } from 'react'
import { IconButton, List, Text } from 'react-native-paper'
import { useExecutionContext } from '../../context/ExecutionContextProvider'
import { wTranslate } from '../../utils/translation/translation-helpers'
import { containerOf, FinishedExecutionState } from '../../utils/wollok-helpers'
import SentencesView from '../sentences/SentencesView'
import ExceptionModal from '../ui/ExceptionModal'

function SourceInspector() {
	const { state } = useExecutionContext()

	if (state.done) {
		return <FinishExecution state={state} />
	}

	const container = containerOf(state.next)

	if (!container) {
		return <Text>SHOW ERROR: {state.next.kind}</Text>
	}

	if (container.is('Method') && container.isNative()) {
		return (
			<List.Item
				title={wTranslate('debugger.nativeCode')}
				left={() => <IconButton icon="apps-box" />}
			/>
		)
	}

	return (
		<SentencesView
			sentences={container.sentences()}
			highlightedNode={state.next}
		/>
	)
}

type FinishExecutionProps = {
	state: FinishedExecutionState
}
function FinishExecution({ state }: FinishExecutionProps) {
	const [endModal, setShowModal] = useState(true)

	if (!state.error) {
		return (
			<List.Item
				title={wTranslate('debugger.done.message')}
				left={() => <IconButton icon={'check'} />}
			/>
		)
	}

	return (
		<>
			<List.Item
				onPress={() => setShowModal(true)}
				title={state.error.name}
				description={state.error.message}
				left={() => <IconButton icon={'close'} />}
			/>
			<ExceptionModal
				exception={state.error}
				visible={endModal}
				setVisible={setShowModal}
			/>
		</>
	)
}

export default SourceInspector
