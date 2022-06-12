import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Portal } from 'react-native-paper'
import { Theme, useTheme } from '../../theme'

export function LoadingScreen() {
	const { spinner } = styles(useTheme())
	return (
		<Portal.Host>
			<Portal>
				<View style={spinner}>
					<ActivityIndicator animating={true} size="large" />
				</View>
			</Portal>
		</Portal.Host>
	)
}

const styles = (theme: Theme) =>
	StyleSheet.create({
		spinner: {
			backgroundColor: theme.colors.onSurface,
			aspectRatio: 1,
			width: '30%',
			display: 'flex',
			justifyContent: 'center',
			borderRadius: 20,
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: [{ translateX: -50 }, { translateY: -50 }],
		},
	})
