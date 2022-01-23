import { RouteProp, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, List, Text } from 'react-native-paper'
import {
	Class,
	Expression,
	Literal,
	Method,
	Module,
	Package,
	Reference,
	Send,
} from 'wollok-ts/dist/model'
import { RootStackParamList } from '../../App'
import { ExpressionDisplay } from '../../components/expressions/ExpressionDisplay'
import {
	NumberInputModal,
	TextInputModal,
} from '../../components/expressions/LiteralModal/LiteralInputModals'
import { MessageList } from '../../components/expressions/messages-list'
import { SubmitCheckButton } from '../../components/ui/Header'
import { useProject } from '../../context/ProjectProvider'
import { translate } from '../../utils/translation-helpers'
import {
	allFields,
	allScopedVariables,
	isMethodFQN,
	isNamedSingleton,
	literalClassFQN,
	methodByFQN,
} from '../../utils/wollok-helpers'

export type ExpressionMakerProp = RouteProp<
	RootStackParamList,
	'ExpressionMaker'
>

export type ExpressionOnSubmit = (expression: Expression) => void

function ExpressionMaker(props: {
	context: Module | Method
	initialExpression?: Expression
	onSubmit: ExpressionOnSubmit
}) {
	const [expression, setExpression] = useState(props.initialExpression)
	const [showNumberModal, setShowNumberModal] = useState(false)
	const [showTextModal, setShowTextModal] = useState(false)
	function reset() {
		setExpression(undefined)
	}
	const navigation = useNavigation()
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<SubmitCheckButton
					disabled={!!expression}
					onSubmit={() => {
						props.onSubmit(expression!)
					}}
				/>
			),
		})
	}, [navigation, expression, props])

	return (
		<View>
			<ExpressionDisplay backgroundColor="white" expression={expression} />
			<ScrollView style={styles.view}>
				{expression ? (
					<List.Section>
						<List.Subheader>{translate('expression.messages')}</List.Subheader>
						<ListMessages expression={expression} setMessage={setExpression} />
					</List.Section>
				) : (
					<List.Section>
						<List.Subheader>{translate('expression.variables')}</List.Subheader>
						{(props.context instanceof Method
							? allScopedVariables(props.context)
							: allFields(props.context)
						).map(({ id, name }) => (
							<List.Item
								key={id}
								title={name}
								onPress={() => setExpression(new Reference({ name: name! }))}
							/>
						))}

						<List.Subheader>
							{translate('expression.mainObjects')}
						</List.Subheader>
						<ListObjectsReferences
							packageName="main"
							setReference={setExpression}
						/>

						<List.Subheader>{translate('expression.literals')}</List.Subheader>
						<List.Item
							title={translate('expression.aNumber')}
							onPress={() => setShowNumberModal(true)}
						/>
						<List.Item
							title={translate('expression.aString')}
							onPress={() => setShowTextModal(true)}
						/>
						<List.Item
							title={translate('expression.true')}
							onPress={() => setExpression(new Literal({ value: true }))}
						/>
						<List.Item
							title={translate('expression.false')}
							onPress={() => setExpression(new Literal({ value: false }))}
						/>
						<List.Item
							title={translate('expression.null')}
							onPress={() => setExpression(new Literal({ value: null }))}
						/>

						<List.Subheader>
							{translate('expression.wollokObjects')}
						</List.Subheader>
						<ListObjectsReferences
							packageName="wollok"
							setReference={setExpression}
						/>
					</List.Section>
				)}
				<Button onPress={reset}>
					{translate('clear').toLocaleUpperCase()}
				</Button>
				<NumberInputModal
					setExpression={setExpression}
					visible={showNumberModal}
					setVisible={setShowNumberModal}
				/>
				<TextInputModal
					setExpression={setExpression}
					visible={showTextModal}
					setVisible={setShowTextModal}
				/>
			</ScrollView>
		</View>
	)
}

type ListObjectsReferencesProps = {
	packageName: string
	setReference: (ref: Expression) => void
}
function ListObjectsReferences({
	packageName,
	setReference,
}: ListObjectsReferencesProps) {
	const { project } = useProject()

	// TODO: Add variables
	return (
		<>
			{project
				.getNodeByFQN<Package>(packageName)
				.descendants()
				.filter(isNamedSingleton)
				.map(({ id, name }) => (
					<List.Item
						key={id}
						title={name}
						onPress={() => setReference(new Reference({ name: name! }))}
					/>
				))}
		</>
	)
}

type ListMessagesProps = {
	expression: Expression
	setMessage: (ref: Expression) => void
}
function ListMessages({ expression, setMessage }: ListMessagesProps) {
	const { project } = useProject()
	// TODO: This is a workaroud, use scopes?
	const globalSingletons = project.descendants().filter(isNamedSingleton)

	switch (expression.kind) {
		case 'Reference':
			const singleton = globalSingletons.find(s => s.name === expression.name)
			return singleton ? (
				<MessageList
					newMessageCall={m =>
						setMessage(new Send({ receiver: expression, message: m.name }))
					}
					entity={singleton}
				/>
			) : (
				<Text>{`No se pudo resolver la referencia ${expression.name}`}</Text>
			)
		case 'Literal':
			return (
				<MessageList
					newMessageCall={m =>
						setMessage(new Send({ receiver: expression, message: m.name }))
					}
					entity={project.getNodeByFQN<Class>(literalClassFQN(expression))}
				/>
			)
		default:
			return <Text>{`Todavía no hay mensajes para ${expression.kind}`}</Text>
	}
}

const styles = StyleSheet.create({
	view: { display: 'flex', maxHeight: '94%' },
})

export default function ({
	route: {
		params: { contextFQN, onSubmit, initialExpression },
	},
}: {
	route: RouteProp<RootStackParamList, 'ExpressionMaker'>
}) {
	const { project } = useProject()
	const context = isMethodFQN(contextFQN)
		? methodByFQN(project, contextFQN)
		: project.getNodeByFQN<Module>(contextFQN)
	return (
		<ExpressionMaker
			context={context}
			onSubmit={onSubmit}
			initialExpression={initialExpression}
		/>
	)
}
