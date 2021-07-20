import {
  DarkTheme as NavigationDarkTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native'
import merge from 'deepmerge'
import { DarkTheme as PaperDarkTheme, DefaultTheme } from 'react-native-paper'
import { Theme as PaperTheme } from 'react-native-paper/lib/typescript/types'

export type Theme = PaperTheme & NavigationTheme & { colors: { card: string } }

const mergedDefaultThemes = merge(NavigationDarkTheme, PaperDarkTheme)

export const theme: Theme = merge(mergedDefaultThemes, {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: '#292d3d',
    primary: '#AF254B',
    text: '#FFFFFF',
    notification: '#252939',
    card: '#0C1A31',
  },
})
