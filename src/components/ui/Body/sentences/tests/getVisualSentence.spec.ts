import { render } from '@testing-library/react-native'
import {
	Assignment as AssignmentModel,
	Literal,
	Reference,
	Send as SendModel,
	Sentence,
} from 'wollok-ts/dist/model'
import { Assignment } from '../Assignment'
import { getVisualSentence } from '../getVisualSentence'
import { Send } from '../Send'

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

	it('should match any unknown sentences with the unsupported sentence component', async () => {
		const unsupportedKind = 'Crazy'
		const crazySentence = { kind: unsupportedKind } as unknown as Sentence

		const { getByText } = render(getVisualSentence(crazySentence, 0))
		expect(getByText(unsupportedKind, { exact: false })).toBeTruthy()
	})
})

function checkMatch(
	sentence: Sentence,
	component: (props: any) => JSX.Element,
) {
	expect(getVisualSentence(sentence, 0).type).toBe(component)
}
