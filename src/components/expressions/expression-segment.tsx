import React from 'react'
import {
	ColorValue,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native'
import { Text } from 'react-native-paper'
import { LiteralValue, Node, Send } from 'wollok-ts/dist/model'
import { useTheme } from '../../theme'
import { ParentComponentProp } from '../../utils/type-helpers'
import { getVisualSegment, SelectExpression } from './ExpressionDisplay'

type NodeSegment<T> = T & {
	index: number
	highlighted?: boolean
	onPress?: () => void
}

export const ReferenceSegment = (props: NodeSegment<{ text: string }>) => {
	const theme = useTheme()
	const { text, ...nodeProps } = props
	return (
		<Pill color={theme.colors.expression.reference} {...nodeProps}>
			<Text>{text}</Text>
		</Pill>
	)
}

export const LiteralSegment = (props: NodeSegment<{ value: LiteralValue }>) => {
	const theme = useTheme()
	const { value, ...nodeProps } = props
	return (
		<Pill color={theme.colors.expression.literal} {...nodeProps}>
			<Text>{JSON.stringify(value)}</Text>
		</Pill>
	)
}

export const MessageSegment = (
	props: NodeSegment<{
		send: Send
		highlightedNode?: Node
		onSelect?: SelectExpression
	}>,
) => {
	const theme = useTheme()
	const { send, onSelect } = props
	return (
		<>
			{getVisualSegment(
				send.receiver,
				props.index,
				props.highlightedNode,
				props.onSelect,
				send,
			)}
			<Bullet
				color={theme.colors.expression.message}
				index={props.index + 1}
				highlighted={props.highlighted}>
				<View style={style.row}>
					<Text onPress={props.onPress}>{send.message}</Text>
					<Text>(</Text>
					{send.args.map((arg, i) =>
						(arg as Node).kind === 'Parameter' ? (
							<EmptyPill
								key={i}
								index={props.index - 1}
								highlighted={props.highlightedNode === arg}
								onPress={() => onSelect && onSelect(arg, send)}
							/>
						) : (
							<Argument key={i} color={theme.colors.expression.parameter}>
								{getVisualSegment(
									arg,
									props.index - 1,
									props.highlightedNode,
									props.onSelect,
									send,
								)}
							</Argument>
						),
					)}
					<Text>)</Text>
				</View>
			</Bullet>
		</>
	)
}

const Argument = (props: ParentComponentProp<{ color: ColorValue }>) => (
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
		{props.children}
	</View>
)

////////////////////////////////////////////////////////////////

const Pill = (
	props: ParentComponentProp<NodeSegment<{ color: ColorValue }>>,
) => (
	<View
		onTouchStart={props.onPress}
		style={[style.pill, style.row, segmentStyle(props), highlightStyle(props)]}>
		{props.children}
	</View>
)

export const EmptyPill = (props: NodeSegment<{}>) => {
	const theme = useTheme()
	return (
		<Pill color={theme.colors.expression.empty} {...props}>
			<Text> </Text>
		</Pill>
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
