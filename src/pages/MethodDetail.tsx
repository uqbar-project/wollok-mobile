import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'
import { RootStackParamList } from '../App'

export type MethodDetailsScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'MethodDetails'
>
export const MethodDetail = () => {
	return <View />
}
