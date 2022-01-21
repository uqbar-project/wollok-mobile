import React, { ReactPortal } from 'react'
import { StyleSheet, View } from 'react-native'

export function Row(props: Pick<ReactPortal, 'children' | 'key'>) {
	const { children, ...viewProps } = props
	return (
		<View style={styles.row} {...viewProps}>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	row: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
})
