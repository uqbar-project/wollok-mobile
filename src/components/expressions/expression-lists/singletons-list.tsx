import React from 'react'
import { List } from 'react-native-paper'
import { Expression, Package, Reference } from 'wollok-ts/dist/model'
import { useExpressionContext } from '../../../context/ExpressionContextProvider'
import { useProject } from '../../../context/ProjectProvider'
import { isNamedSingleton } from '../../../utils/wollok-helpers'

type ListSingletonsProps = {
	packageName: string
	setReference: (ref: Expression) => void
}
export function ListSingletons({
	packageName,
	setReference,
}: ListSingletonsProps) {
	const { project } = useProject()
	const {
		actions: { filterBySearch },
	} = useExpressionContext()
	const singletons = project
		.getNodeByFQN<Package>(packageName)
		.descendants()
		.filter(isNamedSingleton)
	return (
		<>
			{filterBySearch(singletons).map(({ id, name }) => (
				<List.Item
					key={id}
					title={name}
					onPress={() => setReference(new Reference({ name: name! }))}
				/>
			))}
		</>
	)
}
