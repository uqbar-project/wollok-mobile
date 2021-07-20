import { StyleSheet } from 'react-native'
import { Theme } from '../../../theme'

export function stylesheet(theme: Theme) {
  return StyleSheet.create({
    modal: {
      padding: 20,
      backgroundColor: theme.colors.background,
    },
  })
}
