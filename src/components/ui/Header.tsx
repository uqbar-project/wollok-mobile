import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { ActivityIndicator, IconButton } from 'react-native-paper'
import { runAsync } from '../../utils/commons'

type SubmitCheckButtonProps = {
	onSubmit: () => void
	disabled?: boolean
}
export const SubmitCheckButton = ({
	disabled,
	onSubmit,
}: SubmitCheckButtonProps) => {
	const [processing, setProcessing] = useState(false)
	const navigation = useNavigation()
	return processing ? (
		<Thinking />
	) : (
		<IconButton
			disabled={disabled}
			icon="check"
			onPress={() => {
				setProcessing(true)
				runAsync(() => {
					onSubmit()
					navigation.goBack()
				})
			}}
		/>
	)
}

export const Thinking = () => (
	<ActivityIndicator animating={true} style={{ marginRight: 10 }} />
)
