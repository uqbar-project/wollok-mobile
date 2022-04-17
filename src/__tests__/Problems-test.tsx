import { render } from '@testing-library/react-native'
import React from 'react'
import { Node, Problem } from 'wollok-ts'
import { ProblemIcon } from '../components/problems/ProblemIcon'
import { ProblemReporterButton } from '../components/problems/ProblemReporterButton'
import { ProblemModal } from '../components/problems/ProblemsModal'
import { methodFQN } from '../utils/wollok-helpers'
import ProjectProviderMock from './mocks/ProjectProviderMock'
import {
	clazz,
	error,
	field,
	method,
	problem,
	sentence,
	singleton,
	test,
	warning,
} from './mocks/wollokProject'

describe('ProblemIcon', () => {
	it('is red on error', () => {
		const { UNSAFE_getByProps } = render(<ProblemIcon problem={error} />)
		expect(
			UNSAFE_getByProps({ icon: 'alert-circle', color: 'red' }),
		).toBeDefined()
	})

	it('is yellow on warning', () => {
		const { UNSAFE_getByProps } = render(<ProblemIcon problem={warning} />)
		expect(UNSAFE_getByProps({ icon: 'alert', color: 'yellow' })).toBeDefined()
	})
})

describe('ProblemReporterButton', () => {
	function renderProblemReporterButton(aNode: Node, ...problems: Problem[]) {
		return render(
			<ProjectProviderMock problems={problems}>
				<ProblemReporterButton node={aNode} />
			</ProjectProviderMock>,
		)
	}

	it('should not be shown if there is no related problems', () => {
		const rendered = renderProblemReporterButton(singleton)
		expect(rendered.toJSON()).toBeNull()
	})

	describe('should render if there is any problem', () => {
		function iconExistTest(name: string, node: Node, problem: Problem) {
			it(name, () => {
				const rendered = renderProblemReporterButton(node, problem)
				expect(rendered.toJSON()).not.toBeNull()
			})
		}

		iconExistTest('with problem node', singleton, warning)

		iconExistTest('inside method body', method, error)

		iconExistTest('inside test body', test, problem(test.sentences()[0]))
	})
})

describe('ProblemModal', () => {
	function renderProblemModal(...problems: Problem[]) {
		return render(
			<ProblemModal
				problems={problems}
				visible={true}
				setVisible={jest.fn()}
				onSelect={jest.fn()}
			/>,
		)
	}

	describe('should render description for', () => {
		function problemDescriptionTest(
			name: string,
			description: string,
			problem: Problem,
		) {
			it(name, () => {
				const { getByText } = renderProblemModal(problem)
				expect(getByText(description)).toBeDefined()
			})
		}

		problemDescriptionTest('singleton', singleton.name!, warning)
		problemDescriptionTest('class', clazz.name!, problem(clazz))
		problemDescriptionTest('field', field.name, problem(field))
		problemDescriptionTest('method', methodFQN(method), problem(method))
		problemDescriptionTest('sentence', methodFQN(method), problem(sentence))
	})
})