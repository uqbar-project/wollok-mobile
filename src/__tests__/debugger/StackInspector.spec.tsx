import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { List } from 'react-native-paper'
import { Test } from 'wollok-ts'
import StackInspector from '../../components/debugging/StackInspector'
import { ExecutionContextProvider } from '../../context/ExecutionContextProvider'
import { renderOnProvider } from '../utils/test-helpers'
import { TestHelperButtons } from '../utils/TestHelperButtons'
import { test } from '../utils/wollokProject'

describe('StackInspector', () => {
	describe('on init', () => {
		it('should show only test frame', () => {
			const { queryAllFramesProps } = renderStackInspector()
			expect(queryAllFramesProps()).toMatchObject([
				{ title: 'tests.Main Describe.Passed test for testing' },
			])
		})
	})

	describe('on many frames', () => {
		it('should show test and method frames', async () => {
			const { queryAllFramesProps, nextFrame } = renderStackInspector()
			await fireEvent.press(nextFrame())
			expect(queryAllFramesProps()).toMatchObject([
				{ title: 'wollok.lib.assert.that(value)' },
				{ title: 'tests.Main Describe.Passed test for testing' },
			])
		})
	})

	describe('on finish', () => {
		it('should show expected message', async () => {
			const { queryAllFramesProps, finish } = renderStackInspector()
			await fireEvent.press(finish())
			expect(queryAllFramesProps()).toEqual([{ title: 'debugger.done.stack' }])
		})
	})
})

function renderStackInspector(_test: Test = test) {
	const { UNSAFE_queryAllByType, getByTestId } = renderOnProvider(
		<ExecutionContextProvider container={_test}>
			<StackInspector />
			<TestHelperButtons />
		</ExecutionContextProvider>,
	)

	return {
		queryAllFramesProps: () =>
			[...UNSAFE_queryAllByType(List.Item)].map((c: any) => c.props),
		finish: () => getByTestId('FINISH'),
		nextFrame: () => getByTestId('NEXT FRAME'),
	}
}
