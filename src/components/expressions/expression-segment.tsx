import React from 'react'
import {
	ColorValue,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native'
import { Text } from 'react-native-paper'
import { LiteralValue, Send } from 'wollok-ts/dist/model'
import { OneOrMany } from '../../utils/type-helpers'
import { getVisualSegment } from './ExpressionDisplay'

export const ReferenceSegment = (props: { text: string; index: number }) => {
	return (
		<Pill index={props.index} color="#EF5B5B">
			<Text>{props.text}</Text>
		</Pill>
	)
}

export const MessageSegment = (props: { send: Send; index: number }) => {
	return (
		<>
			{getVisualSegment(props.send.receiver, props.index)}
			<Bullet color="#4F518C" index={props.index + 1}>
				<View style={style.row}>
					<Text>{props.send.message}(</Text>
					{props.send.args.map(a => (
						<Parameter color="#907AD6">
							{getVisualSegment(a, props.index - 1)}
						</Parameter>
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
	return (
		<Pill index={props.index} color="#20A39E">
			<Text>{JSON.stringify(props.value)}</Text>
		</Pill>
	)
}

export const Pill = (props: {
	children: OneOrMany<JSX.Element>
	color: ColorValue
	index: number
}) => {
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

const Bullet = (props: {
	color: string
	index: number
	children: OneOrMany<JSX.Element>
}) => {
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
	children: OneOrMany<JSX.Element>
	color: ColorValue
}) => (
	<View style={[style.pill, style.row, { backgroundColor: props.color }]}>
		{props.children}
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
