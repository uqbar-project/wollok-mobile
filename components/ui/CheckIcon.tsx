import React from 'react'
import { IconButton, withTheme } from 'react-native-paper'
import { Theme, theme } from '../../theme'
import { AttributeIcon } from '../entity-detail/attribute-icons'

type Props = {
	icons: AttributeIcon
	checked: boolean
	setChecked: (checked: boolean) => void
	theme: Theme
}

const CheckIcon = (props: Props) => {
	const { icons, checked, setChecked } = props
	return (
		<IconButton
			color={checked ? theme.colors.accent : theme.colors.backdrop}
			icon={checked ? icons.checked : icons.unchecked}
			onPress={() => setChecked(!checked)}
		/>
	)
}

export default withTheme(CheckIcon)
