import React from 'react'
import { IconButton } from 'react-native-paper'
import {
	ExecutionDirector,
	ExecutionState,
} from 'wollok-ts/dist/interpreter/interpreter'
import { Row } from '../ui/Row'

export type DebuggerButtonsProps = {
	execution: ExecutionDirector<void>
	updateState: (newState: ExecutionState<void>) => void
}

function DebuggerButtons({ execution, updateState }: DebuggerButtonsProps) {
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
		<Row>
			<IconButton icon={'chevron-right'} onPress={stepOver} />
			<IconButton icon={'chevron-double-right'} onPress={stepIn} />
			<IconButton icon={'chevron-down'} onPress={stepThrough} />
			<IconButton icon={'chevron-up'} onPress={stepOut} />
		</Row>
	)
}

export default DebuggerButtons
