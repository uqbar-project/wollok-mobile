import React from 'react'
import { List } from 'react-native-paper'
import { Test } from 'wollok-ts'
import LocalsInspector from '../../components/debugging/LocalsInspector'
import { ExecutionContextProvider } from '../../context/ExecutionContextProvider'
import { renderOnProvider } from '../utils/test-helpers'
import { test } from '../utils/wollokProject'

describe('LocalsInspector', () => {
	describe('on init', () => {
		it('should show interested locals', () => {
			const { queryAllLocalsProps } = renderLocalsInspector()
			expect(queryAllLocalsProps()).toEqual([
				{ title: 'self', description: 'tests.Main Describe' },
				{ title: 'main.pepita', description: 'main.pepita' },
			])
		})
	})
})

function renderLocalsInspector(_test: Test = test) {
	const { UNSAFE_queryAllByType } = renderOnProvider(
		<ExecutionContextProvider container={_test}>
			<LocalsInspector />
		</ExecutionContextProvider>,
	)

	return {
		queryAllLocalsProps: () =>
			[...UNSAFE_queryAllByType(List.Item)].map((c: any) => c.props),
	}
}
