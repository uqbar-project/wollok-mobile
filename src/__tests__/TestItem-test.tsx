import React from 'react'
import { render } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import TestItem from '../components/tests/TestItem'
import { ProjectProvider } from '../context/ProjectProvider'
import { theme } from '../theme'

import { Body, Literal, Reference, Send, Test } from 'wollok-ts/dist/model'
const success = (success: boolean) =>
	new Test({
		name: 'TEST',
		body: new Body({
			sentences: [
				new Send({
					receiver: new Reference({ name: 'assert' }),
					message: 'that',
					args: [new Literal({ value: success })],
				}),
			],
		}),
	})

it('renders correctly', () => {
	render(
		<ProjectProvider>
			<NavigationContainer theme={theme}>
				<TestItem item={success(true)} />
			</NavigationContainer>
		</ProjectProvider>,
	)
})
