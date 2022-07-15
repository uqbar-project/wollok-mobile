import React from 'react'
import { StyleSheet } from 'react-native'
import { List as ListComponent, Text } from 'react-native-paper'
import {
	Class,
	Environment,
	Expression,
	is,
	Method,
	Module,
	Send,
} from 'wollok-ts/dist/model'
import {
	Context,
	useExpressionContext,
} from '../../../context/ExpressionContextProvider'
import { useProject } from '../../../context/ProjectProvider'
import { wTranslate } from '../../../utils/translation/translation-helpers'
import {
	allMethods,
	literalClassFQN,
	methodLabel,
} from '../../../utils/wollok-helpers'

type ListMessagesProps = {
	expression: Expression
	setMessage: (ref: Expression) => void
}
export function ListMessages({ expression, setMessage }: ListMessagesProps) {
	const { project } = useProject()
	const {
		search,
		context,
		actions: { filterBySearch },
	} = useExpressionContext()
	const methods = search
		? filterBySearch(project.descendants().filter(is('Method')))
		: methodsFor(project, expression, context)

	if (!methods.length) {
		return <NoSuggestions />
	}

	return (
		<>
			{methods.map(m => (
				<MessageItem
					key={m.id}
					receiver={expression}
					method={m}
					onSubmit={setMessage}
				/>
			))}
		</>
	)
}

function MessageItem({
	method,
	receiver,
	onSubmit,
}: {
	receiver: Expression
	method: Method
	onSubmit: (method: Send) => void
}) {
	function onPress() {
		onSubmit(
			new Send({
				receiver,
				message: method.name,
				args: Array.from<any>(method.parameters),
			}),
		)
	}

	return (
		<ListComponent.Item
			key={method.id}
			title={methodLabel(method)}
			onPress={onPress}
		/>
	)
}

const NoSuggestions = () => (
	<Text style={styles.suggestion}>
		{wTranslate('expression.notSeggestions')}
	</Text>
)

const styles = StyleSheet.create({
	suggestion: { display: 'flex', textAlign: 'center' },
})

// TODO: Testing
function methodsFor(
	environment: Environment,
	expression: Expression,
	context: Context,
) {
	switch (expression.kind) {
		case 'Reference':
			const module = context.scope.resolve<Module>(expression.name)
			return module && module.is('Module') ? allMethods(module) : []
		case 'Literal':
			const literalClass = environment.getNodeByFQN<Class>(
				literalClassFQN(expression),
			)
			return allMethods(literalClass)
		case 'Self':
			return allMethods(context.is('Module') ? context : context.parent)
		default:
			return []
	}
}
