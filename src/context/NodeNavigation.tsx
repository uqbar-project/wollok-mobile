import { useNavigation } from '@react-navigation/native'
import React, { ComponentType, createContext } from 'react'
import { Entity, Method, Module, Node, Test } from 'wollok-ts/dist/model'
import { HomeScreenNavigationProp } from '../pages/Home'
import { ParentComponentProp } from '../utils/type-helpers'
import { entityMemberFQN, EntityMemberWithBody } from '../utils/wollok-helpers'
import { createContextHook } from './create-context-hook'

export type Context = Module | Method | Test

// eslint-disable-next-line no-spaced-func
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
			Parameter: e => goToNode(e.parent.parent),
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

export function withNodeNavigation<Props>(Component: ComponentType<Props>) {
	return (props: Props) => (
		<NodeNavigationProvider>
			<Component {...props} />
		</NodeNavigationProvider>
	)
}
