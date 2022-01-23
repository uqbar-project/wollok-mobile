import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { IconButton } from 'react-native-paper'

type SubmitCheckButtonProps = {
	onSubmit: () => void
	disabled?: boolean
}
export const SubmitCheckButton = ({
	disabled,
	onSubmit,
}: SubmitCheckButtonProps) => {
	const navigation = useNavigation()
	return (
		<IconButton
			disabled={disabled}
			icon="check"
			onPress={() => {
				onSubmit()
				navigation.goBack()
			}}
		/>
	)
}
