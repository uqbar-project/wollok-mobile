import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import React from 'react'
import { theme } from '../theme'
import { OneOrMany } from './type-helpers'

export function renderWithTheme(children: OneOrMany<JSX.Element>) {
	return render(
		<NavigationContainer theme={theme}>{children}</NavigationContainer>,
	)
}
