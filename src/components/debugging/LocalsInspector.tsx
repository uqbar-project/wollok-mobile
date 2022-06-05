import React from 'react'
import { ScrollView, View } from 'react-native'
import { List, withTheme } from 'react-native-paper'
import { useExecutionContext } from '../../context/ExecutionContextProvider'

function LocalsInspector() {
	const { interpreter } = useExecutionContext()
	return (
		<ScrollView>
			{interpreter.evaluation.currentFrame.contextHierarchy().map(context => (
				<View key={context.id}>
					{[...context.locals.keys()].map(local => {
						const value = context.get(local)
						const stringValue = interpreter
							.fork()
							.do(function* () {
								return value && (yield* this.send('toString', value))
							})
							.finish()

						const valueLabel = stringValue.error
							? 'ERROR!'
							: stringValue.result?.innerValue ?? 'null'

						return (
							<List.Item
								key={`${local}-${valueLabel}`}
								title={local}
								description={valueLabel}
							/>
						)
					})}
				</View>
			))}
		</ScrollView>
	)
}

export default withTheme(LocalsInspector)
