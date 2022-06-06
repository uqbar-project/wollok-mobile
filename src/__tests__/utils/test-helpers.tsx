import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import React from 'react'
import { theme } from '../../theme'
import ProjectProviderMock from './ProjectProviderMock'
import { OneOrMany } from '../../utils/type-helpers'

export function renderOnProvider(children: OneOrMany<JSX.Element>) {
	return render(
		<ProjectProviderMock>
			<NavigationContainer theme={theme}>{children}</NavigationContainer>
		</ProjectProviderMock>,
	)
}
