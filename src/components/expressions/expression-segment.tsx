import React from 'react'
import {
	ColorValue,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native'
import { Text } from 'react-native-paper'
import { Expression, LiteralValue, Send } from 'wollok-ts/dist/model'
import { useTheme } from '../../theme'
import { ParentComponentProp } from '../../utils/type-helpers'
import { getVisualSegment } from './ExpressionDisplay'

export const ReferenceSegment = (props: { text: string; index: number }) => {
	const theme = useTheme()
	return (
		<Pill index={props.index} color={theme.colors.expression.reference}>
			<Text>{props.text}</Text>
		</Pill>
	)
}

export const MessageSegment = (props: { send: Send; index: number }) => {
	const theme = useTheme()
	return (
		<>
			{getVisualSegment(props.send.receiver, props.index)}
			<Bullet color={theme.colors.expression.message} index={props.index + 1}>
				<View style={style.row}>
					<Text>{props.send.message}(</Text>
					{props.send.args.map((a, i) => (
						<Parameter
							key={i}
							color={theme.colors.expression.parameter}
							arg={a}
							index={props.index - 1}
						/>
					))}
					<Text>)</Text>
				</View>
			</Bullet>
		</>
	)
}

export const LiteralSegment = (props: {
	value: LiteralValue
	index: number
}) => {
	const theme = useTheme()
	return (
		<Pill index={props.index} color={theme.colors.expression.literal}>
			<Text>{JSON.stringify(props.value)}</Text>
		</Pill>
	)
}

export const Pill = (
	props: ParentComponentProp<{
		color: ColorValue
		index: number
	}>,
) => {
	return (
		<View
			style={[
				style.pill,
				style.row,
				{ backgroundColor: props.color, zIndex: -props.index },
			]}>
			{props.children}
		</View>
	)
}

const Bullet = (
	props: ParentComponentProp<{
		color: string
		index: number
	}>,
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
				{
					backgroundColor: props.color,
					zIndex: -props.index,
				},
			]}>
			{props.children}
		</View>
	)
}

const Parameter = (props: {
	color: ColorValue
	arg: Expression
	index: number
}) => (
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
		{getVisualSegment(props.arg, props.index)}
	</View>
)

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
