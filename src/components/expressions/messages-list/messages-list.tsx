import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { List as ListComponent } from 'react-native-paper'
import { Expression, Method, Module, Send } from 'wollok-ts/dist/model'
import { useContext } from '../../../context/ContextProvider'
import { allMethods, methodLabel } from '../../../utils/wollok-helpers'

export const MessageList = (props: {
	receiver: Expression
	newMessageCall: (message: Send) => void
	entity: Module
}) => (
	<>
		{allMethods(props.entity).map((m, i) => (
			<MessageItem
				key={i}
				receiver={props.receiver}
				message={m}
				onSubmit={props.newMessageCall}
			/>
		))}
	</>
)

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
