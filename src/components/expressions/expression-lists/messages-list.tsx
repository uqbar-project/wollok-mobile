import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet } from 'react-native'
import { List as ListComponent, Text } from 'react-native-paper'
import {
	Class,
	Environment,
	Expression,
	is,
	List,
	Method,
	Send,
} from 'wollok-ts/dist/model'
import { useContext } from '../../../context/ContextProvider'
import { useProject } from '../../../context/ProjectProvider'
import { translate } from '../../../utils/translation-helpers'
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
	const { search } = useContext()
	const methods = methodsFor(project, expression, search)

	return methods.length ? (
		<MessageList
			receiver={expression}
			newMessageCall={setMessage}
			methods={methods}
		/>
	) : (
		<Text style={styles.suggestion}>
			{translate('expression.notSeggestions')}
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
	} = useContext()
	return (
		<>
			{filterBySearch(props.methods).map(m => (
				<MessageItem
					key={m.id}
					receiver={props.receiver}
					message={m}
					onSubmit={props.newMessageCall}
				/>
			))}
		</>
	)
}

function MessageItem({
	message: m,
	receiver,
	onSubmit,
}: {
	receiver: Expression
	message: Method
	onSubmit: (method: Send) => void
}) {
	const navigation = useNavigation()
	const { fqn } = useContext()
	return (
		<>
			<ListComponent.Item
				key={m.id}
				title={methodLabel(m)}
				onPress={() => {
					;(navigation as any).push('NewMessageSend', {
						method: m,
						receiver,
						onSubmit,
						contextFQN: fqn,
					})
				}}
			/>
		</>
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
