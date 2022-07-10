import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { Field, Module } from 'wollok-ts'
import { templateProject } from '../context/initialProject'
import { ProjectProvider, useProject } from '../context/ProjectProvider'

describe('ProjectProvider', () => {
	it('should be initialized', () => {
		const {
			result: { current },
		} = givenADummyProject()

		expect(current.name).toBe('test-project')
	})

	it('should delete a member', () => {
		const { result } = givenADummyProject()
		const member = result.current.project.getNodeByFQN<Field>(
			'main.pepita.energia',
		)
		expect(member).toBeDefined()
		act(() => result.current.actions.deleteMember(member))
		expect(() => result.current.project.getNodeById(member.id)).toThrowError(
			`Missing node with id ${member.id}`,
		)
	})

	it('should edit a member', () => {
		const { result } = givenADummyProject()
		const member = result.current.project.getNodeByFQN<Field>(
			'main.pepita.energia',
		)
		expect(member).toBeDefined()

		act(() =>
			result.current.actions.changeMember(member.parent)(
				member,
				member.copy({ name: 'otraEnergia' }),
			),
		)
		expect(
			result.current.project.getNodeByFQN('main.pepita.otraEnergia'),
		).toBeDefined()
		expect(() =>
			result.current.project.getNodeByFQN('main.pepita.energia'),
		).toThrowError('Could not resolve reference to main.pepita.energia')
	})

	it('should delete an entity', () => {
		const { result } = givenADummyProject()
		const entity = result.current.project.getNodeByFQN<Module>('main.pepita')
		expect(entity).toBeDefined()
		act(() => result.current.actions.deleteEntity(entity))
		expect(() => result.current.project.getNodeById(entity.id)).toThrowError(
			`Missing node with id ${entity.id}`,
		)
	})

	it('should edit an entity', () => {
		const { result } = givenADummyProject()
		const entity = result.current.project.getNodeByFQN<Module>('main.pepita')
		expect(entity).toBeDefined()
		act(() =>
			result.current.actions.editEntity(
				entity,
				entity.copy({ name: 'otraPepita' }),
			),
		)
		expect(result.current.project.getNodeByFQN('main.otraPepita')).toBeDefined()
		expect(() =>
			result.current.project.getNodeByFQN('main.pepita'),
		).toThrowError('Could not resolve reference to main.pepita')
	})
})

const givenADummyProject = () => {
	const wrapper = (props: { children: JSX.Element[] }) => (
		<ProjectProvider
			initialProject={templateProject()}
			descriptor={{ name: 'test-project', url: 'FAKE_URL' }}>
			{props.children}
		</ProjectProvider>
	)
	return renderHook(() => useProject(), { wrapper })
}
