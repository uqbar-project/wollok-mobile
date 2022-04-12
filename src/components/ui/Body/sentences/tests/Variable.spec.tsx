import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import React from 'react'
import { Literal, Variable as VariableModel } from 'wollok-ts/dist/model'
import { theme } from '../../../../../theme'
import { Variable } from '../Variable'

function renderVariable(variable: VariableModel) {
	const { UNSAFE_queryByProps, getByText } = render(
		<NavigationContainer theme={theme}>
			<Variable variable={variable} />
		</NavigationContainer>,
	)

	return {
		getName: () => getByText(variable.name),
		queryArrow: () => UNSAFE_queryByProps({ icon: 'arrow-right' }),
		queryLock: () => UNSAFE_queryByProps({ icon: 'lock' }),
		getByText,
	}
}

describe('variable component tests', () => {
	it('should display the variable name', () => {
		const variable = new VariableModel({ name: 'name', isConstant: false })
		const { getName: name } = renderVariable(variable)
		expect(name()).toBeTruthy()
	})

	it('should show the assignment if a value is provided', () => {
		const variable = new VariableModel({
			name: 'name',
			isConstant: false,
			value: new Literal({ value: 'some string' }),
		})

		const { queryArrow, getByText } = renderVariable(variable)

		expect(queryArrow).toBeTruthy()
		expect(getByText('some string', { exact: false })).toBeTruthy()
	})

	it('should not show the assignment if no value is provided', () => {
		const variable = new VariableModel({
			name: 'name',
			isConstant: false,
		})
		const { queryArrow } = renderVariable(variable)

		expect(queryArrow()).toBeNull()
	})

	it('should show the lock icon if the variable is constant', () => {
		const variable = new VariableModel({
			name: 'name',
			isConstant: true,
		})
		const { queryLock } = renderVariable(variable)

		expect(queryLock()).toBeTruthy()
	})
})
