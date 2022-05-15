import React from 'react'
import { IconButton, Text } from 'react-native-paper'
import { Node, Return, Sentence, Variable } from 'wollok-ts/dist/model'
import { wTranslate } from '../../utils/translation-helpers'
import { isNullExpression } from '../../utils/wollok-helpers'
import { ReferenceSegment } from '../expressions/expression-segment'
import { ExpressionDisplay } from '../expressions/ExpressionDisplay'
import { ProblemReporterButton } from '../problems/ProblemReporterButton'
import { ConstantVariableIcon } from '../ui/ConstantVariableIcon'
import { Row } from '../ui/Row'
import { Assignment } from 'wollok-ts/dist/model'

function VisualSentence({ sentence }: { sentence: Sentence }) {
	return (
		<Row>
			<ProblemReporterButton node={sentence} />
			<NodeComponent node={sentence} />
		</Row>
	)
}

function NodeComponent({ node }: { node: Node }) {
	switch (node.kind) {
		case 'Send':
			return <ExpressionDisplay expression={node} withIcon={false} />
		case 'Assignment':
			return <AssignmentComponent node={node} showNull={true} />
		case 'Variable':
			return <VariableComponent variable={node} />
		case 'Return':
			return <ReturnComponent return={node} />
		default:
			return (
				<Text>{`${wTranslate('sentence.unsupportedSentence')}: ${
					node.kind
				}`}</Text>
			)
	}
}

type AssignmentComponentProps = {
	node: Assignment | Variable
	showNull?: boolean
}
export function AssignmentComponent({
	node,
	showNull,
}: AssignmentComponentProps) {
	const ignoreValue = showNull === false && isNullExpression(node.value)
	const name = node.is('Assignment') ? node.variable.name : node.name
	return (
		<Row>
			<ReferenceSegment text={name} index={0} />
			{!ignoreValue && <IconButton icon="arrow-right" />}
			{!ignoreValue && (
				<ExpressionDisplay expression={node.value} withIcon={false} />
			)}
		</Row>
	)
}

export function VariableComponent({ variable }: { variable: Variable }) {
	return (
		<Row>
			<IconButton icon="variable" /*olor={theme.colors.primary}*/ />
			<ConstantVariableIcon variable={variable} />
			<AssignmentComponent node={variable} showNull={false} />
		</Row>
	)
}

export const returnIconName = 'arrow-expand-up'
export function ReturnComponent({ return: wReturn }: { return: Return }) {
	return (
		<Row>
			<IconButton icon={returnIconName} /*color={theme.colors.primary}*/ />
			<ExpressionDisplay expression={wReturn.value} withIcon={false} />
		</Row>
	)
}

export default VisualSentence
