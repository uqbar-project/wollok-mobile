import React from 'react'
import { List } from 'react-native-paper'
import { Expression } from 'wollok-ts/dist/model'
import { wTranslate } from '../../../utils/translation/translation-helpers'
import { ListLiterals } from './literals-list'
import { ListMessages } from './messages-list'
import { ListSingletons } from './singletons-list'
import { ListVariables } from './variables-list'

interface NewExpressionListProps {
	expression?: Expression
	setExpression: (e: Expression) => void
}

export function NewExpressionList({
	expression,
	setExpression,
}: NewExpressionListProps) {
	return expression ? (
		<List.Section>
			<List.Subheader>{wTranslate('expression.messages')}</List.Subheader>
			<ListMessages expression={expression} setMessage={setExpression} />
		</List.Section>
	) : (
		<List.Section>
			<List.Subheader>{wTranslate('expression.variables')}</List.Subheader>
			<ListVariables setReference={setExpression} />

			<List.Subheader>{wTranslate('expression.mainObjects')}</List.Subheader>
			<ListSingletons packageName="main" setReference={setExpression} />

			<List.Subheader>{wTranslate('expression.literals')}</List.Subheader>
			<ListLiterals setLiteral={setExpression} />

			<List.Subheader>{wTranslate('expression.wollokObjects')}</List.Subheader>
			<ListSingletons packageName="wollok" setReference={setExpression} />
		</List.Section>
	)
}
