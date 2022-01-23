import React from 'react'
import { List as ListComponent } from 'react-native-paper'
import { Method, Module } from 'wollok-ts/dist/model'
import { allMethods, methodLabel } from '../../utils/wollok-helpers'

export const MessageList = (props: {
	newMessageCall: (message: Method) => void
	entity: Module
}) => (
	<>
		{allMethods(props.entity).map(m => (
			<ListComponent.Item
				key={m.id}
				title={methodLabel(m)}
				//TODO: Open modal
				onPress={() => props.newMessageCall(m)}
			/>
		))}
	</>
)
