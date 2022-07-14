import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, IconButton, List, TextInput } from 'react-native-paper'
import { Expression, Parameter, Send } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import { ListLiterals } from '../components/expressions/expression-lists/literals-list'
import { ListMessages } from '../components/expressions/expression-lists/messages-list'
import { ListSingletons } from '../components/expressions/expression-lists/singletons-list'
import { ListVariables } from '../components/expressions/expression-lists/variables-list'
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
import { entityMemberByFQN } from '../utils/wollok-helpers'

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
					disabled={!expression}
					onSubmit={() => {
						onSubmit(expression!)
					}}
				/>
			),
		})
	}, [navigation, expression, onSubmit])

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

	function replaceArgument(send: Send, actual: Expression | Parameter) {
		return (e?: Expression) => {
			const args = send.args as any[]
			args.forEach((a, i) => {
				if (a === actual) {
					args[i] = e
				}
			})
			setConstroller({
				expression: e,
				setExpression: replaceArgument(send, e!),
			})
		}
	}

	const { context } = useExpressionContext()

	const sentences = context.kind === 'Method' && context.sentences()

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
							if (expressionOrParameter.is('Parameter')) {
								return setConstroller({
									expression: expressionOrParameter as any,
									setExpression: replaceArgument(
										parent!,
										expressionOrParameter,
									),
								})
							}
							// Only edit empty parameters
							setConstroller({ expression, setExpression })
						}}
					/>
				</ScrollView>
			</Collapsible>
			<IconButton
				icon={expandedDisplay ? 'chevron-up' : 'chevron-down'}
				onPress={() => {
					setExpandedDisplay(!expandedDisplay)
				}}
			/>
			<TextInput
				label={wTranslate(
					`expression.search.${expression ? 'message' : 'entity'}`,
				)}
				value={search}
				onChangeText={setSearch}
			/>
			<ScrollView style={styles.view}>
				{controller.expression && !controller.expression.is('Parameter') ? (
					<List.Section>
						<List.Subheader>{wTranslate('expression.messages')}</List.Subheader>
						<ListMessages
							expression={controller.expression}
							setMessage={controller.setExpression}
						/>
					</List.Section>
				) : (
					<List.Section>
						<List.Subheader>
							{wTranslate('expression.variables')}
						</List.Subheader>
						<ListVariables setReference={controller.setExpression} />

						<List.Subheader>
							{wTranslate('expression.mainObjects')}
						</List.Subheader>
						<ListSingletons
							packageName="main"
							setReference={controller.setExpression}
						/>

						<List.Subheader>{wTranslate('expression.literals')}</List.Subheader>
						<ListLiterals setLiteral={controller.setExpression} />

						<List.Subheader>
							{wTranslate('expression.wollokObjects')}
						</List.Subheader>
						<ListSingletons
							packageName="wollok"
							setReference={controller.setExpression}
						/>
					</List.Section>
				)}
				{/* Move to ExpressionDisplay component */}
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
