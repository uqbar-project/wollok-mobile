import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, IconButton, TextInput } from 'react-native-paper'
import { Expression, Parameter, Send } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import { NewExpressionList } from '../components/expressions/expression-lists/NewExpressionList'
import { ExpressionDisplay } from '../components/expressions/ExpressionDisplay'
import VisualSentence from '../components/sentences/VisualSentence'
import { SubmitCheckButton } from '../components/ui/Header'
import {
	Context,
	ExpressionContextProvider,
	useExpressionContext,
} from '../context/ExpressionContextProvider'
import { useProject } from '../context/ProjectProvider'
import { wTranslate } from '../utils/translation/translation-helpers'
import { entityMemberByFQN, isComplete } from '../utils/wollok-helpers'

export type ExpressionMakerScreenProp = StackNavigationProp<
	RootStackParamList,
	'ExpressionMaker'
>

export type ExpressionOnSubmit = (expression: Expression) => void

function ExpressionMaker(props: {
	initialExpression?: Expression
	onSubmit: ExpressionOnSubmit
}) {
	const {
		search,
		actions: { setSearch, clearSearch },
	} = useExpressionContext()
	const navigation = useNavigation()
	const [expression, setInitialExpression] = useState(props.initialExpression)
	const [controller, setConstroller] = useState({ expression, setExpression })
	const [expandedDisplay, setExpandedDisplay] = useState(false)

	const { onSubmit } = props
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: wTranslate('expression.title'),
			headerTitleAlign: 'center',
			animationEnabled: false,
			headerRight: () => (
				<SubmitCheckButton
					disabled={!expression || !isComplete(expression)}
					onSubmit={() => {
						onSubmit(expression!)
					}}
				/>
			),
		})
	}, [navigation, expression, controller, onSubmit])

	function setExpression(e?: Expression) {
		clearSearch()
		setInitialExpression(e)
		setConstroller({
			expression: e,
			setExpression,
		})
	}

	function reset() {
		setExpression(undefined)
	}

	function replaceChild(send: Send, actual: Expression | Parameter) {
		return (e?: Expression) => {
			if (send.receiver === actual) {
				;(send as any).receiver = e
			}
			const args = send.args as any[]
			args.forEach((a, i) => {
				if (a === actual) {
					args[i] = e
				}
			})
			setConstroller({
				expression: e,
				setExpression: replaceChild(send, e!),
			})
		}
	}

	const { context } = useExpressionContext()

	const sentences = context.kind === 'Method' && context.sentences()

	const isSubexpressionSelected =
		controller.expression && !controller.expression.is('Parameter')

	return (
		<View>
			<Collapsible
				collapsed={expandedDisplay}
				collapsedHeight={sentences ? sentences.length * 50 : 0}
				renderChildrenCollapsed={true}>
				<ScrollView
					style={{
						backgroundColor: '#fff',
					}}>
					{sentences &&
						(expandedDisplay
							? sentences
							: sentences.slice(sentences.length - 2)
						).map(s => <VisualSentence sentence={s} />)}

					<ExpressionDisplay
						backgroundColor="grey"
						withIcon={false}
						expression={expression}
						highlightedNode={controller.expression}
						onSelect={(expressionOrParameter, parent) => {
							if (!parent) {
								// We cannot make the correct replacement
								return setConstroller({ expression, setExpression })
							} // Select main expression

							setConstroller({
								expression: expressionOrParameter as any,
								setExpression: replaceChild(parent, expressionOrParameter),
							})
						}}
					/>
				</ScrollView>
			</Collapsible>
			<IconButton
				icon={expandedDisplay ? 'chevron-up' : 'chevron-down'}
				onPress={() => setExpandedDisplay(!expandedDisplay)}
			/>
			<TextInput
				label={wTranslate(
					`expression.search.${
						isSubexpressionSelected ? 'message' : 'reference'
					}`,
				)}
				value={search}
				onChangeText={setSearch}
			/>
			<ScrollView style={styles.view}>
				<NewExpressionList
					expression={
						isSubexpressionSelected ? controller.expression : undefined
					}
					setExpression={controller.setExpression}
				/>

				{/* Move to ExpressionDisplay component? */}
				<Button onPress={reset}>
					{wTranslate('clear').toLocaleUpperCase()}
				</Button>
			</ScrollView>
		</View>
	)
}

type ExpressionMakerRouteProp = RouteProp<RootStackParamList, 'ExpressionMaker'>

const styles = StyleSheet.create({
	view: { display: 'flex', maxHeight: '85%' },
})

export default function ({
	route: {
		params: { contextFQN, onSubmit, initialExpression },
	},
}: {
	route: ExpressionMakerRouteProp
}) {
	const { project } = useProject()
	const context: Context = entityMemberByFQN(project, contextFQN)

	return (
		<ExpressionContextProvider context={context} fqn={contextFQN}>
			<ExpressionMaker
				onSubmit={onSubmit}
				initialExpression={initialExpression}
			/>
		</ExpressionContextProvider>
	)
}
