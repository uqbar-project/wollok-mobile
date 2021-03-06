import React from 'react'
import { List } from 'react-native-paper'
import { Expression, Reference } from 'wollok-ts/dist/model'
import { useExpressionContext } from '../../../context/ExpressionContextProvider'
import { allFields, allScopedVariables } from '../../../utils/wollok-helpers'

type ListVariablesProps = {
	setReference: (ref: Expression) => void
}
export function ListVariables({ setReference }: ListVariablesProps) {
	const {
		context,
		actions: { filterBySearch },
	} = useExpressionContext()
	const variables = context.is('Module')
		? allFields(context)
		: allScopedVariables(context)
	return (
		<>
			{filterBySearch(variables).map(({ id, name }) => (
				<List.Item
					key={id}
					title={name}
					onPress={() => setReference(new Reference({ name }))}
				/>
			))}
		</>
	)
}
