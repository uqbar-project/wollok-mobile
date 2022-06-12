import React from 'react'
import { IconButton, Text } from 'react-native-paper'
import {
	Assignment,
	Node,
	Return,
	Sentence,
	Variable,
} from 'wollok-ts/dist/model'
import { wTranslate } from '../../utils/translation/translation-helpers'
import { isNullExpression } from '../../utils/wollok-helpers'
import {
	highlightStyle,
	ReferenceSegment,
} from '../expressions/expression-segment'
import { ExpressionDisplay } from '../expressions/ExpressionDisplay'
import { ProblemReporterButton } from '../problems/ProblemReporterButton'
import { ConstantVariableIcon } from '../ui/ConstantVariableIcon'
import { Row } from '../ui/Row'

type VisualSentenceProps = {
	sentence: Sentence
	highlightedNode?: Node
}
function VisualSentence({ sentence, highlightedNode }: VisualSentenceProps) {
	return (
		<Row>
			<ProblemReporterButton node={sentence} />
			<NodeComponent node={sentence} highlightedNode={highlightedNode} />
		</Row>
	)
}

type NodeComponentProps = {
	node: Node
	highlightedNode?: Node
}
function NodeComponent({ node, highlightedNode }: NodeComponentProps) {
	switch (node.kind) {
		case 'Send':
			return (
				<ExpressionDisplay
					expression={node}
					withIcon={false}
					highlightedNode={highlightedNode}
				/>
			)
		case 'Assignment':
			return (
				<AssignmentComponent
					node={node}
					showNull={true}
					highlightedNode={highlightedNode}
				/>
			)
		case 'Variable':
			return (
				<VariableComponent variable={node} highlightedNode={highlightedNode} />
			)
		case 'Return':
			return <ReturnComponent return={node} highlightedNode={highlightedNode} />
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
	highlightedNode?: Node
}
export function AssignmentComponent({
	node,
	showNull,
	highlightedNode,
}: AssignmentComponentProps) {
	const ignoreValue = showNull === false && isNullExpression(node.value)
	const name = node.is('Assignment') ? node.variable.name : node.name
	return (
		<Row>
			<ReferenceSegment
				text={name}
				index={0}
				highlighted={highlightedNode === node}
			/>
			{!ignoreValue && <IconButton icon="arrow-right" />}
			{!ignoreValue && (
				<ExpressionDisplay
					expression={node.value}
					withIcon={false}
					highlightedNode={highlightedNode}
				/>
			)}
		</Row>
	)
}

export function VariableComponent({
	variable,
	highlightedNode,
}: {
	variable: Variable
	highlightedNode?: Node
}) {
	return (
		<Row>
			<IconButton icon="variable" />
			<ConstantVariableIcon variable={variable} />
			<AssignmentComponent
				node={variable}
				showNull={false}
				highlightedNode={highlightedNode}
			/>
		</Row>
	)
}

export const returnIconName = 'arrow-expand-up'
export function ReturnComponent({
	return: wReturn,
	highlightedNode,
}: {
	return: Return
	highlightedNode?: Node
}) {
	const highlighted = highlightedNode === wReturn
	return (
		<Row>
			<IconButton
				style={highlightStyle({ highlighted })}
				icon={returnIconName}
			/>
			<ExpressionDisplay
				expression={wReturn.value}
				withIcon={false}
				highlightedNode={highlightedNode}
			/>
		</Row>
	)
}

export default VisualSentence
