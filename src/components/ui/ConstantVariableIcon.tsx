import React from 'react'
import { IconButton } from 'react-native-paper'
import { Variable } from 'wollok-ts/dist/model'
import { useTheme } from '../../theme'

export const ConstantVariableIcon = (props: { variable: Variable }) => {
	const theme = useTheme()
	return props.variable.isConstant ? (
		<IconButton icon="lock" color={theme.colors.primary} />
	) : null
}
