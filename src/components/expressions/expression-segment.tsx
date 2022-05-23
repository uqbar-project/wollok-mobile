import React from 'react'
import {
	ColorValue,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native'
import { Text } from 'react-native-paper'
import { Expression, LiteralValue, Node, Send } from 'wollok-ts/dist/model'
import { useTheme } from '../../theme'
import { ParentComponentProp } from '../../utils/type-helpers'
import { getVisualSegment } from './ExpressionDisplay'

type NodeSegment<T> = T & {
	index: number
	highlighted?: boolean
}

export const ReferenceSegment = (props: NodeSegment<{ text: string }>) => {
	const theme = useTheme()
	return (
		<Pill
			index={props.index}
			color={theme.colors.expression.reference}
			highlighted={props.highlighted}>
			<Text>{props.text}</Text>
		</Pill>
	)
}

export const LiteralSegment = (props: NodeSegment<{ value: LiteralValue }>) => {
	const theme = useTheme()
	return (
		<Pill
			index={props.index}
			color={theme.colors.expression.literal}
			highlighted={props.highlighted}>
			<Text>{JSON.stringify(props.value)}</Text>
		</Pill>
	)
}

export const MessageSegment = (
	props: NodeSegment<{ send: Send; highlightedNode?: Node }>,
) => {
	const theme = useTheme()
	return (
		<>
			{getVisualSegment(
				props.send.receiver,
				props.index,
				props.highlightedNode,
			)}
			<Bullet
				color={theme.colors.expression.message}
				index={props.index + 1}
				highlighted={props.highlighted}>
				<View style={style.row}>
					<Text>{props.send.message}(</Text>
					{props.send.args.map((a, i) => (
						<Parameter
							key={i}
							color={theme.colors.expression.parameter}
							arg={a}
							index={props.index - 1}
							highlightedNode={props.highlightedNode}
						/>
					))}
					<Text>)</Text>
				</View>
			</Bullet>
		</>
	)
}

const Parameter = (
	props: NodeSegment<{
		color: ColorValue
		arg: Expression
		highlightedNode?: Node
	}>,
) => (
	<View
		style={[
			style.pill,
			style.row,
			{
				backgroundColor: props.color,
				shadowOffset: { height: 0, width: 0 },
				shadowRadius: 3,
				shadowColor: 'black',
				shadowOpacity: 50,
			},
		]}>
		{getVisualSegment(props.arg, props.index, props.highlightedNode)}
	</View>
)

////////////////////////////////////////////////////////////////

const Pill = (
	props: ParentComponentProp<NodeSegment<{ color: ColorValue }>>,
) => {
	return (
		<View
			style={[
				style.pill,
				style.row,
				segmentStyle(props),
				highlightStyle(props),
			]}>
			{props.children}
		</View>
	)
}

const Bullet = (
	props: ParentComponentProp<NodeSegment<{ color: ColorValue }>>,
) => {
	const bulletCurve = 20
	const curve: StyleProp<ViewStyle> =
		props.index > 0
			? {
					marginLeft: -bulletCurve,
					paddingLeft: bulletCurve + 3,
			  }
			: {}

	return (
		<View
			style={[
				style.bullet,
				style.row,
				curve,
				segmentStyle(props),
				highlightStyle(props),
			]}>
			{props.children}
		</View>
	)
}

const segmentStyle = ({
	color,
	index,
}: {
	color: ColorValue
	index: number
}) => ({
	backgroundColor: color,
	zIndex: -index,
})

export const highlightStyle = ({ highlighted }: { highlighted?: boolean }) => ({
	borderColor: 'yellow',
	borderWidth: highlighted ? 3 : 0,
})

const style = StyleSheet.create({
	bullet: {
		paddingHorizontal: 10,
		paddingLeft: 25,
		marginLeft: -15,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		borderRadius: 20,
	},
	pill: {
		marginHorizontal: 5,
		borderRadius: 20,
		paddingHorizontal: 5,
	},
	row: {
		fontSize: 25,
		height: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
})
