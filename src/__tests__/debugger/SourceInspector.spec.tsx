import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { List } from 'react-native-paper'
import { Test } from 'wollok-ts'
import SourceInspector from '../../components/debugging/SourceInspector'
import ExceptionModal from '../../components/ui/ExceptionModal'
import { ExecutionContextProvider } from '../../context/ExecutionContextProvider'
import { renderOnProvider } from '../utils/test-helpers'
import { TestHelperButtons } from '../utils/TestHelperButtons'
import { describe as wDescribe, test } from '../utils/wollokProject'

describe('SourceInspector', () => {
	describe('on init', () => {
		it('should show test code', () => {
			const { queryByText } = renderSourceInspector()
			expect(queryByText('assert')).toBeTruthy()
			expect(queryByText('that')).toBeTruthy()
			expect(queryByText('(')).toBeTruthy()
			expect(queryByText('true')).toBeTruthy()
			expect(queryByText(')')).toBeTruthy()
		})

		it('should highlight first reference', () => {
			const { highlighted } = renderSourceInspector()
			expect(highlighted('assert')).toBeTruthy()
		})
	})

	describe('on native', () => {
		it('should show expected message', async () => {
			const { queryAllItemProps, native } = renderSourceInspector()
			await fireEvent.press(native())
			expect(queryAllItemProps()).toMatchObject([
				{ title: 'debugger.nativeCode' },
			])
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
	const {
		UNSAFE_queryByProps,
		UNSAFE_queryByType,
		UNSAFE_queryAllByType,
		queryByText,
		getByTestId,
	} = renderOnProvider(
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
		queryByText,

		queryAllItemProps: () =>
			[...UNSAFE_queryAllByType(List.Item)].map((c: any) => c.props),
		finish: () => getByTestId('FINISH'),
		native: () => getByTestId('NATIVE'),
	}
}
