import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { LiteralValue, Send } from 'wollok-ts/dist/model'
import { OneOrMany } from '../../utils/type-helpers'
import { getVisualSegment } from './ExpressionDisplay'

export const ReferenceSegment = (props: { text: string; index: number }) => {
	return (
		<Bullet color="green" index={props.index}>
			<Text>{props.text}</Text>
		</Bullet>
	)
}

export const MethodSegment = (props: { send: Send; index: number }) => {
	return (
		<Bullet color="red" index={props.index}>
			<View style={style.row}>
				{getVisualSegment(props.send.receiver)}
				<Text>{props.send.message}</Text>
				{/* TODO: Improve this. Use Parameter? */}
				{props.send.args.map(getVisualSegment)}
			</View>
		</Bullet>
	)
}

export const LiteralSegment = (props: {
	value: LiteralValue
	index: number
}) => {
	return (
		<View
			style={[style.pill, { backgroundColor: 'green', zIndex: -props.index }]}>
			<Text>{JSON.stringify(props.value)}</Text>
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

// const Parameter = (props: { text: string; color: string }) => (
// 	<View style={[style.pill, { backgroundColor: props.color }]}>
// 		<Text>{props.text}</Text>
// 	</View>
// )

const style = StyleSheet.create({
	bullet: {
		paddingHorizontal: 10,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		borderRadius: 20,
	},
	pill: {
		marginHorizontal: 5,
		borderRadius: 20,
		paddingVertical: 3,
		paddingHorizontal: 5,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
})
