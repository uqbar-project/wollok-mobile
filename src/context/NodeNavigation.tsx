import { useNavigation } from '@react-navigation/native'
import React, { createContext } from 'react'
import { Entity, Method, Module, Node, Test } from 'wollok-ts'
import { HomeScreenNavigationProp } from '../pages/Home'
import { ParentComponentProp } from '../utils/type-helpers'
import { entityMemberFQN, EntityMemberWithBody } from '../utils/wollok-helpers'
import { createContextHook } from './create-context-hook'

export type Context = Module | Method | Test

export const ContextContext = createContext<{
	goToNode: (n: Node) => void
} | null>(null)

export function NodeNavigationProvider({ children }: ParentComponentProp) {
	const navigation = useNavigation<HomeScreenNavigationProp>()

	const goToEntityDetails = (entity: Entity) => {
		navigation.navigate('EntityDetails', {
			entityFQN: entity.fullyQualifiedName(),
		})
	}
	const goToEditor = (entityMember: EntityMemberWithBody) => {
		navigation.navigate('Editor', {
			fqn: entityMemberFQN(entityMember),
		})
	}

	const goToNode = (n: Node): void => {
		n.match({
			Method: goToEditor,
			Test: goToEditor,
			Describe: goToEntityDetails,
			Module: goToEntityDetails,
			Field: f => goToEntityDetails(f.parent),
			Body: b => goToNode(b.parent),
			Sentence: e => goToNode(e.parent),
			Expression: e => goToNode(e.parent),
		})
	}

	const init = { goToNode }

	return (
		<ContextContext.Provider value={init}>{children}</ContextContext.Provider>
	)
}

export const useNodeNavigation = createContextHook(ContextContext, {
	contextName: 'NodeNavigationProvider',
	hookName: 'useNodeNavigation',
})
