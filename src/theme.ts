import {
	DarkTheme as NavigationDarkTheme,
	Theme as NavigationTheme,
} from '@react-navigation/native'
import merge from 'deepmerge'
import { DarkTheme as PaperDarkTheme } from 'react-native-paper'
import { Theme as PaperTheme } from 'react-native-paper/lib/typescript/types'

export type Theme = PaperTheme &
	NavigationTheme & {
		colors: { card: string; success: string; failure: string }
	}

const mergedDefaultThemes = merge(NavigationDarkTheme, PaperDarkTheme)

export const theme: Theme = {
	...mergedDefaultThemes,
	dark: true,
	colors: {
		...mergedDefaultThemes.colors,
		background: '#292d3d',
		primary: '#AF254B',
		success: 'green',
		failure: 'yellow',
		text: '#FFFFFF',
		notification: '#252939',
		card: '#0C1A31',
		accent: '#AF254B',
		placeholder: '#747474',
	},
}
