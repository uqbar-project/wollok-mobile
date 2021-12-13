import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { Method } from '../../models/method'
import { OneOrMany } from '../../utils/type-helpers'

export const ObjectSegment = (props: { text: string; index: number }) => {
	return (
		<Bullet color="green" index={props.index}>
			<Text>{props.text}</Text>
		</Bullet>
	)
}

export const MethodSegment = (props: { method: Method; index: number }) => {
	return (
		<Bullet color="red" index={props.index}>
			<View style={style.row}>
				<Text>{props.method.name}</Text>
				{props.method.parameters.map((p, i) => (
					<Bullet color="grey" key={p} index={i}>
						<Text>{p}</Text>
					</Bullet>
				))}
			</View>
		</Bullet>
	)
}

const Bullet = (props: {
	color: string
	index: number
	children: OneOrMany<JSX.Element>
}) => {
	const bulletCurve = 20
	const borderRadius: StyleProp<ViewStyle> =
		props.index > 0
			? {
					marginLeft: -bulletCurve,
					paddingLeft: bulletCurve + 3,
			  }
			: {}

	return (
		<View
			style={[
				style.pill,
				borderRadius,
				{
					backgroundColor: props.color,
					zIndex: -props.index,
				},
			]}>
			{props.children}
		</View>
	)
}

const style = StyleSheet.create({
	pill: {
		paddingHorizontal: 10,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		borderRadius: 20,
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		textAlignVertical: 'center',
	},
})
