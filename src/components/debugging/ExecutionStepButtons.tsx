import React from 'react'
import { IconButton } from 'react-native-paper'
import { useExecutionContext } from '../../context/ExecutionContextProvider'
import { Row } from '../ui/Row'

function ExecutionStepButtons() {
	const {
		execution,
		state,
		actions: { updateState },
	} = useExecutionContext()
	function stepIn() {
		updateState(execution.stepIn())
	}
	function stepOut() {
		updateState(execution.stepOut())
	}
	function stepOver() {
		updateState(execution.stepOver())
	}
	function stepThrough() {
		updateState(execution.stepThrough())
	}
	return (
		<Row style={{ justifyContent: 'space-between' }}>
			<IconButton
				disabled={state.done}
				icon={'chevron-right'}
				onPress={stepOver}
			/>
			<IconButton
				disabled={state.done}
				icon={'chevron-double-right'}
				onPress={stepIn}
			/>
			<IconButton
				disabled={state.done}
				icon={'chevron-down'}
				onPress={stepThrough}
			/>
			<IconButton disabled={state.done} icon={'chevron-up'} onPress={stepOut} />
		</Row>
	)
}

export default ExecutionStepButtons
