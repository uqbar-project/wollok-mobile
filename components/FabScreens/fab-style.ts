import { StyleSheet } from 'react-native'
import { Theme } from '../../theme'

export const getFabStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.primary,
    },
  })
