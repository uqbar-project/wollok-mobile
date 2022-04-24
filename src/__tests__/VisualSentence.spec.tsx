import { render } from '@testing-library/react-native'
import React from 'react'
import {
	Assignment as AssignmentModel,
	Literal,
	Reference,
	Return as ReturnModel,
	Send as SendModel,
	Sentence,
	Variable as VariableModel,
} from 'wollok-ts/dist/model'
import { Assignment } from '../components/Body/sentences/Assignment'
import { Return } from '../components/Body/sentences/Return'
import { Send } from '../components/Body/sentences/Send'
import { Variable } from '../components/Body/sentences/Variable'
import { VisualSentence } from '../components/Body/sentences/VisualSentence'
import { renderWithTheme } from './utils/test-helpers'

describe('matching sentences with components', () => {
	it('should match a send sentence', () => {
		checkMatch(
			new SendModel({
				receiver: new Reference({ name: 'assert' }),
				message: 'that',
			}),
			Send,
		)
	})

	it('should match an assignment sentence', () => {
		checkMatch(
			new AssignmentModel({
				variable: new Reference({ name: 'assert' }),
				value: new Literal({ value: true }),
			}),
			Assignment,
		)
	})

	it('should match a return sentence', () => {
		checkMatch(
			new ReturnModel({
				value: new Literal({ value: true }),
			}),
			Return,
		)
	})

	it('should match a variable sentence', () => {
		checkMatch(new VariableModel({ name: 'name', isConstant: false }), Variable)
	})

	it('should match any unknown sentences with the unsupported sentence component', async () => {
		const unsupportedKind = 'Crazy'
		const crazySentence = { kind: unsupportedKind } as unknown as Sentence

		const { getByText } = render(<VisualSentence sentence={crazySentence} />)
		expect(getByText(unsupportedKind, { exact: false })).toBeTruthy()
	})
})

function checkMatch(
	sentence: Sentence,
	component: (props: any) => JSX.Element,
) {
	const { UNSAFE_queryByType } = renderWithTheme(
		<VisualSentence sentence={sentence} />,
	)
	expect(UNSAFE_queryByType(component)).toBeTruthy()
}
