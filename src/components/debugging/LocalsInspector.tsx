import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { DirectedInterpreter } from 'wollok-ts/dist/interpreter/interpreter'
import { Row } from '../ui/Row'

export type LocalsInspectorProps = {
	interpreter: DirectedInterpreter
}

function LocalsInspector({ interpreter }: LocalsInspectorProps) {
	return (
		<ScrollView>
			{interpreter.evaluation.currentFrame.contextHierarchy().map(context => (
				<View key={context.id}>
					<Text>{context.id}</Text>
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
							<Row key={local}>
								<Text>{local}</Text>
								<Text>{'||'}</Text>
								<Text>{valueLabel}</Text>
							</Row>
						)
					})}
				</View>
			))}
		</ScrollView>
	)
}

export default LocalsInspector
