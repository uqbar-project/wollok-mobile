import React from 'react'
import { List } from 'react-native-paper'
import { Expression, Method, Reference } from 'wollok-ts/dist/model'
import { useContext } from '../../../context/ContextProvider'
import { allFields, allScopedVariables } from '../../../utils/wollok-helpers'

type ListVariablesProps = {
	setReference: (ref: Expression) => void
}
export function ListVariables({ setReference }: ListVariablesProps) {
	const {
		context,
		actions: { filterBySearch },
	} = useContext()
	const variables =
		context instanceof Method ? allScopedVariables(context) : allFields(context)
	return (
		<>
			{filterBySearch(variables).map(({ id, name }) => (
				<List.Item
					key={id}
					title={name}
					onPress={() => setReference(new Reference({ name: name! }))}
				/>
			))}
		</>
	)
}
