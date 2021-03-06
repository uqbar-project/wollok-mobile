import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, List, TextInput } from 'react-native-paper'
import { Expression } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../App'
import { ListLiterals } from '../components/expressions/expression-lists/literals-list'
import { ListMessages } from '../components/expressions/expression-lists/messages-list'
import { ListSingletons } from '../components/expressions/expression-lists/singletons-list'
import { ListVariables } from '../components/expressions/expression-lists/variables-list'
import { ExpressionDisplay } from '../components/expressions/ExpressionDisplay'
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
	const [expression, setInitialExpression] = useState(props.initialExpression)

	function setExpression(e?: Expression) {
		clearSearch()
		setInitialExpression(e)
	}

	function reset() {
		setExpression(undefined)
	}

	const navigation = useNavigation()
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: wTranslate('expression.title'),
			headerTitleAlign: 'center',
			animationEnabled: false,
			headerRight: () => (
				<SubmitCheckButton
					disabled={!expression}
					onSubmit={() => {
						props.onSubmit(expression!)
					}}
				/>
			),
		})
	}, [navigation, expression, props])

	return (
		<View>
			<ExpressionDisplay
				backgroundColor="white"
				withIcon={false}
				expression={expression}
			/>
			<TextInput
				label={wTranslate(
					`expression.search.${expression ? 'message' : 'entity'}`,
				)}
				value={search}
				onChangeText={setSearch}
			/>
			<ScrollView style={styles.view}>
				{expression ? (
					<List.Section>
						<List.Subheader>{wTranslate('expression.messages')}</List.Subheader>
						<ListMessages expression={expression} setMessage={setExpression} />
					</List.Section>
				) : (
					<List.Section>
						<List.Subheader>
							{wTranslate('expression.variables')}
						</List.Subheader>
						<ListVariables setReference={setExpression} />

						<List.Subheader>
							{wTranslate('expression.mainObjects')}
						</List.Subheader>
						<ListSingletons packageName="main" setReference={setExpression} />

						<List.Subheader>{wTranslate('expression.literals')}</List.Subheader>
						<ListLiterals setLiteral={setExpression} />

						<List.Subheader>
							{wTranslate('expression.wollokObjects')}
						</List.Subheader>
						<ListSingletons packageName="wollok" setReference={setExpression} />
					</List.Section>
				)}
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
