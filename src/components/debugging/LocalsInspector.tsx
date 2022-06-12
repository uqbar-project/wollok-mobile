import React from 'react'
import { ScrollView, View } from 'react-native'
import { List, withTheme } from 'react-native-paper'
import { Context } from 'wollok-ts'
import { useExecutionContext } from '../../context/ExecutionContextProvider'

function LocalsInspector() {
	const {
		interpreter,
		eval: { toStringOf },
	} = useExecutionContext()
	const hierarchy = interpreter.evaluation.currentFrame.contextHierarchy()

	function interestedLocals(context: Context) {
		return [...context.locals.keys()]
			.filter(local => !['true', 'false', 'null'].includes(local))
			.filter(local => !local.startsWith('wollok'))
	}

	return (
		<ScrollView>
			{hierarchy.map(context => (
				<View key={context.id}>
					{interestedLocals(context).map(local => {
						const value = context.get(local)
						const label = toStringOf(value)
						return (
							<List.Item
								key={`${local}-${label}`}
								title={local}
								description={label}
							/>
						)
					})}
				</View>
			))}
		</ScrollView>
	)
}

export default withTheme(LocalsInspector)
