import React from 'react'
import { IconButton } from 'react-native-paper'
import { Problem } from 'wollok-ts/dist/model'

interface ProblemIconProps {
	problem: Problem
	onPress?: () => void
}

export function ProblemIcon({ problem, onPress }: ProblemIconProps) {
	return problem.level === 'error' ? (
		<IconButton icon="alert-circle" color="red" onPress={onPress} />
	) : (
		<IconButton icon="alert" color="yellow" onPress={onPress} />
	)
}
