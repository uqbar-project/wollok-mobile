import React, { ComponentProps } from 'react'
import { StyleSheet } from 'react-native'
import { ActivityIndicator, IconButton } from 'react-native-paper'

type LoadingIconButtonProps = ComponentProps<typeof IconButton> & {
	loading: boolean
}
export default function LoadingIconButton({
	loading,
	...props
}: LoadingIconButtonProps) {
	return loading ? (
		<ActivityIndicator style={style.spinner} animating={true} />
	) : (
		<IconButton {...props} />
	)
}

const style = StyleSheet.create({
	spinner: {
		marginRight: 10,
	},
})
