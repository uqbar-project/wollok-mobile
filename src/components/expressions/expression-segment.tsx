import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

export const Pill = (props: { text: string }) => {
	return <Text style={style.pill}>{props.text}</Text>
}

const style = StyleSheet.create({
	pill: {
		textAlignVertical: 'center',
		paddingHorizontal: 10,
		borderRadius: 20,
		backgroundColor: 'green',
	},
})
