import { fireEvent } from '@testing-library/react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { act, ReactTestInstance } from 'react-test-renderer'
import { Body, Test, WollokException } from 'wollok-ts'
import TestItem from '../components/tests/TestItem'
import { theme } from '../theme'
import { TestRun } from '../utils/wollok-helpers'
import { renderOnProvider } from './utils/test-helpers'

const testMock = new Test({
	name: 'TEST',
	body: new Body({}),
})

const passTest: () => TestRun = () => ({ result: 'Passed' })
const failureExpection = {
	name: 'Assertion failure',
	message: 'Expected blah but get bleh',
} as WollokException
const failureTest: () => TestRun = () => ({
	result: 'Failure',
	exception: failureExpection,
})
const errorExpection = {
	name: 'MNU',
	message: 'Blah does not undestand msg',
} as WollokException
const errorTest: () => TestRun = () => ({
	result: 'Error',
	exception: errorExpection,
})

const finishTestRunning = () =>
	act(async () => {
		jest.runOnlyPendingTimers()
	})

const runTest = async (button: () => ReactTestInstance) => {
	await fireEvent.press(button())
	await finishTestRunning()
}

const renderTest = (runner: () => TestRun = jest.fn()) => {
	const {
		UNSAFE_queryByType,
		UNSAFE_getByProps,
		UNSAFE_queryByProps,
		queryByText,
	} = renderOnProvider(
		<TestItem
			item={testMock}
			runner={runner}
			onClick={jest.fn()}
			theme={theme}
		/>,
	)
	return {
		runIcon: () => UNSAFE_getByProps({ icon: 'play-circle' }),
		messageIcon: () => UNSAFE_queryByProps({ icon: 'alert-outline' }),
		spinner: () => UNSAFE_queryByType(ActivityIndicator),
		hasText: (text: string) => Boolean(queryByText(text)),
	}
}

describe('Test run icon', () => {
	it('without result has disabled color', () => {
		const { runIcon, messageIcon } = renderTest()
		expect(runIcon().props.color).toBe(theme.colors.disabled)
		expect(messageIcon()).toBeNull()
	})

	it('on passed has success color', async () => {
		const { runIcon, messageIcon } = renderTest(passTest)
		await runTest(runIcon)
		expect(runIcon().props.color).toBe(theme.colors.success)
		expect(messageIcon()).toBeNull()
	})

	it('on failure has failure color and message icon', async () => {
		const { runIcon, messageIcon } = renderTest(failureTest)
		await runTest(runIcon)
		expect(runIcon().props.color).toBe(theme.colors.failure)
		expect(messageIcon()).toBeDefined()
	})

	it('on error has error color and message icon', async () => {
		const { runIcon, messageIcon } = renderTest(errorTest)
		await runTest(runIcon)
		expect(runIcon().props.color).toBe(theme.colors.error)
		expect(messageIcon()).toBeDefined()
	})
})

describe('Test running', () => {
	it('On start spinner appears', async () => {
		const { runIcon, spinner } = renderTest(passTest)
		expect(spinner()).toBeNull()
		await fireEvent.press(runIcon())
		expect(spinner()).toBeDefined()
		await finishTestRunning() // For pending timeouts
	})

	it('On finish spinner disappears', async () => {
		const { runIcon, spinner } = renderTest(passTest)
		await fireEvent.press(runIcon())
		expect(spinner()).toBeDefined()
		await finishTestRunning()
		expect(spinner()).toBeNull()
	})

	it('On finish with error and button pressed, show exception details', async () => {
		const { runIcon, messageIcon, hasText } = renderTest(errorTest)
		await runTest(runIcon)
		await fireEvent.press(messageIcon()!)
		expect(hasText(errorExpection.name)).toBeTruthy()
		expect(hasText(errorExpection.message)).toBeTruthy()
	})
})
