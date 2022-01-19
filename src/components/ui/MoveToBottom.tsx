import React from 'react'
import { View, StyleSheet } from 'react-native'

function moveToBottom(component: JSX.Element) {
	return <View style={styles.container}>{component}</View>
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
	},
})
export default moveToBottom
