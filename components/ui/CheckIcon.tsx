import React from 'react'
import { IconButton, withTheme } from 'react-native-paper'
import { Theme, theme } from '../../theme'

type Props = {
	checkedIconName: string
	uncheckedIconName: string
	checked: boolean
	setChecked: (checked: boolean) => void,
   theme: Theme
}

const CheckIcon = (props: Props) => {
	const { checkedIconName, uncheckedIconName, checked, setChecked } = props
	return (
		<IconButton
         color={checked ? theme.colors.accent : theme.colors.backdrop}
			icon={checked ? checkedIconName : uncheckedIconName}
			onPress={() => setChecked(!checked)}
		/>
	)
}

export default withTheme(CheckIcon)
