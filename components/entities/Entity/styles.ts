import { StyleSheet } from 'react-native'
import { Theme } from '../../../theme'

export function stylesheet(theme: Theme) {
	return StyleSheet.create({
		item: {
			marginHorizontal: 10,
			borderRadius: 5,
			padding: 10,
			marginTop: 10,
			borderWidth: 1,

			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 1,
			},
			shadowOpacity: 0.22,
			shadowRadius: 2.22,

			elevation: 3,
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.notification,
		},
		itemTitle: {
			fontSize: 20,
		},
	})
}
