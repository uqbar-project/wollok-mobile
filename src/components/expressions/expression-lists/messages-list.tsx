import React from 'react'
import { StyleSheet } from 'react-native'
import { List as ListComponent, Text } from 'react-native-paper'
import { List } from 'wollok-ts/dist/extensions'
import {
	Class,
	Environment,
	Expression,
	is,
	Method,
	Send,
} from 'wollok-ts/dist/model'
import { useExpressionContext } from '../../../context/ExpressionContextProvider'
import { useProject } from '../../../context/ProjectProvider'
import { wTranslate } from '../../../utils/translation/translation-helpers'
import {
	allMethods,
	isNamedSingleton,
	literalClassFQN,
	methodLabel,
} from '../../../utils/wollok-helpers'

type ListMessagesProps = {
	expression: Expression
	setMessage: (ref: Expression) => void
}
export function ListMessages({ expression, setMessage }: ListMessagesProps) {
	const { project } = useProject()
	const { search } = useExpressionContext()
	const methods = methodsFor(project, expression, search)

	return methods.length ? (
		<MessageList
			receiver={expression}
			newMessageCall={setMessage}
			methods={methods}
		/>
	) : (
		<Text style={styles.suggestion}>
			{wTranslate('expression.notSeggestions')}
		</Text>
	)
}

const MessageList = (props: {
	receiver: Expression
	newMessageCall: (message: Send) => void
	methods: List<Method>
}) => {
	const {
		actions: { filterBySearch },
	} = useExpressionContext()
	return (
		<>
			{filterBySearch(props.methods).map(m => (
				<MessageItem
					key={m.id}
					receiver={props.receiver}
					method={m}
					onSubmit={props.newMessageCall}
				/>
			))}
		</>
	)
}

function MessageItem({
	method: m,
	receiver,
	onSubmit,
}: {
	receiver: Expression
	method: Method
	onSubmit: (method: Send) => void
}) {
	// const navigation = useNavigation<ExpressionMakerScreenProp>()
	// const { fqn } = useExpressionContext()

	function onPress() {
		onSubmit(
			new Send({
				message: m.name,
				receiver: receiver,
				args: m.parameters.map(_ => undefined as any),
			}),
		)
	}

	// function onPress() {
	// 	if (m.parameters.length) {
	// 		navigation.push('ArgumentsMaker', {
	// 			method: m,
	// 			receiver,
	// 			onSubmit,
	// 			contextFQN: fqn,
	// 		})
	// 	} else {
	// 		onSubmit(new Send({ message: m.name, receiver: receiver }))
	// 	}
	// }

	return (
		<ListComponent.Item key={m.id} title={methodLabel(m)} onPress={onPress} />
	)
}

const styles = StyleSheet.create({
	suggestion: { display: 'flex', textAlign: 'center' },
})

function methodsFor(
	environment: Environment,
	expression: Expression,
	search: string,
) {
	if (search) {
		return environment.descendants().filter(is('Method'))
	}
	switch (expression.kind) {
		case 'Reference':
			// TODO: This is a workaroud, use scopes?
			const globalSingletons = environment
				.descendants()
				.filter(isNamedSingleton)
			const singleton = globalSingletons.find(s => s.name === expression.name)
			return singleton ? allMethods(singleton) : []
		case 'Literal':
			const literalClass = environment.getNodeByFQN<Class>(
				literalClassFQN(expression),
			)
			return allMethods(literalClass)
		default:
			return []
	}
}
