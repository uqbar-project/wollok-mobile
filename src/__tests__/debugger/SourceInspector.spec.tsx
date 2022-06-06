import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { Test } from 'wollok-ts'
import SourceInspector from '../../components/debugging/SourceInspector'
import ExceptionModal from '../../components/ui/ExceptionModal'
import { ExecutionContextProvider } from '../../context/ExecutionContextProvider'
import { renderOnProvider } from '../utils/test-helpers'
import { describe as wDescribe, test } from '../utils/wollokProject'
import { TestHelperButtons } from '../utils/TestHelperButtons'

describe('SourceInspector', () => {
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
				<TestHelperButtons />
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
