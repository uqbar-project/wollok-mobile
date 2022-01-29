import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function IconImage(props: { icon: any }) {
	return <Image source={props.icon} style={styles.icon} />
}

const styles = StyleSheet.create({
	icon: {
		alignSelf: 'center',
	},
})
