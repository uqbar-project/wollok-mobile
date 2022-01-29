import React, { ReactPortal } from 'react'
import { StyleSheet, View } from 'react-native'

export function Row(
	props: Pick<ReactPortal, 'children' | 'key'> & { style?: any },
) {
	const { children, style, ...viewProps } = props
	return (
		<View style={[styles.row, style]} {...viewProps}>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	row: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
})
