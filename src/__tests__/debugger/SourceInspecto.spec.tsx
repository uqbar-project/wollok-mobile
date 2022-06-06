import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { Test } from 'wollok-ts'
import SourceInspector from '../../components/debugging/SourceInspector'
import ExceptionModal from '../../components/ui/ExceptionModal'
import {
	ExecutionContextProvider,
	useExecutionContext,
} from '../../context/ExecutionContextProvider'
import { executionFor } from '../../utils/wollok-helpers'
import { initialContext } from '../utils/ProjectProviderMock'
import { renderOnProvider } from '../utils/test-helpers'
import { describe as wDescribe, project, test } from '../utils/wollokProject'

describe('SourceInspector', () => {
	beforeEach(() => {
		initialContext.actions.newInterpreter.mockReturnValue(executionFor(project))
	})

	describe('on init', () => {
		it('should show test code', () => {
			const { queryByText } = renderSourceInspector()
			expect(queryByText('assert')).toBeTruthy()
			expect(queryByText('that(')).toBeTruthy()
			expect(queryByText('true')).toBeTruthy()
			expect(queryByText(')')).toBeTruthy()
		})

		it('should highlight first reference', () => {
			const { highlighted } = renderSourceInspector()
			expect(highlighted('assert')).toBeTruthy()
		})
	})

	describe('on finish', () => {
		it('good, should show ok icon', async () => {
			const { checkIcon, finish } = renderSourceInspector()
			await fireEvent.press(finish())
			expect(checkIcon()).toBeTruthy()
		})

		it('bad, should show exception', async () => {
			const { closeIcon, ExceptionModal, finish } = renderSourceInspector(
				wDescribe.members[1] as Test,
			)
			await fireEvent.press(finish())
			expect(closeIcon()).toBeTruthy()
			expect(ExceptionModal()).toBeTruthy()
		})
	})
})

function renderSourceInspector(_test: Test = test) {
	const { UNSAFE_queryByProps, UNSAFE_queryByType, queryByText, getByTestId } =
		renderOnProvider(
			<ExecutionContextProvider container={_test}>
				<SourceInspector />
				<FinishButton />
			</ExecutionContextProvider>,
		)

	return {
		highlighted: (children: any) =>
			UNSAFE_queryByProps({ highlighted: true })?.findByProps({ children }),
		checkIcon: () => UNSAFE_queryByProps({ icon: 'check' }),
		closeIcon: () => UNSAFE_queryByProps({ icon: 'close' }),
		ExceptionModal: () => UNSAFE_queryByType(ExceptionModal),
		finish: () => getByTestId('FINISH'),
		queryByText,
	}
}

function FinishButton() {
	const {
		execution,
		actions: { updateState },
	} = useExecutionContext()

	function stepToBody() {
		updateState(execution.finish())
	}

	return (
		<Button testID="FINISH" onPress={stepToBody}>
			X
		</Button>
	)
}
