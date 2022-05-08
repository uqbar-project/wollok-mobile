import { RouteProp, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Expression, Send } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import ExpressionInput from '../components/ui/ExpressionInput'
import { SubmitCheckButton } from '../components/ui/Header'
import { wTranslate } from '../utils/translation-helpers'
import { methodLabel } from '../utils/wollok-helpers'

export function ArgumentsMaker({
	route: {
		params: { method, receiver, contextFQN, onSubmit },
	},
}: {
	route: RouteProp<RootStackParamList, 'ArgumentsMaker'>
}) {
	const [args, setArguments] = useState<(Expression | undefined)[]>(
		method.parameters.map(() => undefined),
	)

	const navigation = useNavigation()

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: methodLabel(method), //TODO: Show receiver?
			headerRight: () => (
				<SubmitCheckButton
					disabled={args.some(a => a === undefined)}
					onSubmit={() =>
						onSubmit!(
							new Send({
								receiver,
								args: args as Expression[],
								message: method.name,
							}),
						)
					}
				/>
			),
		})
	}, [navigation, args, method, onSubmit, receiver])

	function setParameter(i: number, newParameter?: Expression) {
		const newParameters = [...args]
		newParameters[i] = newParameter
		setArguments(newParameters)
	}

	return (
		<View>
			{method.parameters.map((_, i) => (
				<View key={i} style={[styles.parameter]}>
					<Text style={styles.paramName}>{_.name}</Text>
					<ExpressionInput
						contextFQN={contextFQN}
						setValue={expression => setParameter(i, expression)}
						value={args[i]}
						inputPlaceholder={upperCaseFirst(
							wTranslate('expression.enterValue'),
						)}
					/>
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	parameter: {
		marginVertical: 15,
		marginHorizontal: 5,
	},
	paramName: {
		fontSize: 22,
		marginBottom: 4,
	},
})
