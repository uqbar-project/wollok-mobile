import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { List as ListComponent, Text } from 'react-native-paper'
import { Expression, Method, Module, Send } from 'wollok-ts/dist/model'
import {
	allMethods,
	methodFQN,
	methodLabel,
} from '../../../utils/wollok-helpers'
import ExpressionView from '../../ui/ExpressionView'
import FormModal from '../../ui/FormModal/FormModal'
import { Row } from '../../ui/Row'

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
	const [modalVisible, setModalVisible] = useState(false)
	return (
		<>
			<ListComponent.Item
				key={m.id}
				title={methodLabel(m)}
				onPress={() => setModalVisible(true)}
			/>
			<NewMessageCallModal
				receiver={receiver}
				method={m}
				visible={modalVisible}
				setVisible={setModalVisible}
				onSubmit={onSubmit}
			/>
		</>
	)
}

function NewMessageCallModal({
	method,
	receiver,
	onSubmit,
	...modalProps
}: {
	receiver: Expression
	method: Method
	setVisible: (value: boolean) => void
	visible: boolean
	onSubmit: (send: Send) => void
}) {
	const [args, setArguments] = useState<(Expression | undefined)[]>(
		Array(method.parameters.length),
	)

	const nav = useNavigation()
	function setParameter(i: number, newParameter?: Expression) {
		const newParameters = [...args]
		newParameters[i] = newParameter
		setArguments(newParameters)
	}

	return (
		<FormModal
			title={method.name}
			valid={args.every(p => p !== undefined)}
			onSubmit={() =>
				onSubmit(
					new Send({
						receiver,
						message: method.name,
						args: args as Expression[],
					}),
				)
			}
			{...modalProps}>
			{method.parameters.map((_, i) => (
				<Row key={i}>
					<Text>{_.name}</Text>
					<ExpressionView
						fqn={methodFQN(method)}
						setValue={expression => setParameter(i, expression)}
						value={args[i]}
						navigator={nav}
					/>
				</Row>
			))}
		</FormModal>
	)
}
