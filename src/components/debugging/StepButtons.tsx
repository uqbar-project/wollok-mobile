import React from 'react'
import { IconButton } from 'react-native-paper'
import { useExecutionContext } from '../../context/ExecutionContextProvider'
import { Row } from '../ui/Row'

function DebuggerButtons() {
	const {
		execution,
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
			<IconButton icon={'chevron-right'} onPress={stepOver} />
			<IconButton icon={'chevron-double-right'} onPress={stepIn} />
			<IconButton icon={'chevron-down'} onPress={stepThrough} />
			<IconButton icon={'chevron-up'} onPress={stepOut} />
		</Row>
	)
}

export default DebuggerButtons
