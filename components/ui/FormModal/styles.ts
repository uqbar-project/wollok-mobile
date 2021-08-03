import { StyleSheet } from 'react-native'
import { Theme } from '../../../theme'

export function stylesheet(theme: Theme) {
	return StyleSheet.create({
		modal: {
			paddingHorizontal: 20,
			paddingVertical: 10,
			backgroundColor: theme.colors.background,
		},
		title: {
			textAlign: 'center',
			paddingBottom: 10
		}
	})
}
