import React from 'react'
import { TextInput, withTheme } from 'react-native-paper'
import { Theme } from '../../../theme'

const ParameterInput = (props: {
	setParameter: (parameter: string) => void
	parameter: string
	theme: Theme
	onPress: () => void
	icon: 'trash-can-outline' | 'plus'
}) => {
	return (
		<TextInput
			placeholder={'Nombre del parametro'}
			onChangeText={props.setParameter}
			value={props.parameter}
			right={
				<TextInput.Icon
					color={props.theme.colors.primary}
					onPress={props.onPress}
					name={props.icon}
				/>
			}
		/>
	)
}

export default withTheme(ParameterInput)
