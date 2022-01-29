import React from 'react'
import { View } from 'react-native'
import { FAB, withTheme } from 'react-native-paper'
import { Theme } from '../../theme'
import { ParentComponentProp } from '../../utils/type-helpers'
import { getFabStyles } from './fab-style'

function FabAddScreen(
	props: ParentComponentProp<{
		theme: Theme
		onPress?: () => void
	}>,
) {
	const styles = getFabStyles(props.theme)
	return (
		<View style={styles.screen}>
			{props.children}
			<FAB icon="plus" onPress={props.onPress} style={styles.fab} />
		</View>
	)
}

export default withTheme(FabAddScreen)
