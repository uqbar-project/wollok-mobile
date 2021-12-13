import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, List } from 'react-native-paper'
import { RootStackParamList } from '../../App'
import { ExpressionDisplay } from '../../components/expressions/ExpressionDisplay'
import moveToBottom from '../../components/ui/MoveToBottom'
import {
	ExpressionProvider,
	useExpression,
} from '../../context/ExpressionProvider'
import { ProjectProvider, useProject } from '../../context/ProjectProvider'
import { Entity } from '../../models/entity'
import { last } from '../../utils/commons'

export type EntitiesScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	'ExpressionMaker'
>

function ExpressionMaker() {
	const { project } = useProject()
	const {
		expression,
		actions: { addSegment, reset },
	} = useExpression()

	return (
		<View style={container}>
			{expression.segments.length > 0 && expression.segments.length < 2 ? (
				<List.Section>
					<List.Subheader>Mensajes</List.Subheader>
					{(last(expression.segments) as Entity).methods.map(m => (
						<View key={m.name}>
							<List.Item title={m.name} onPress={() => addSegment(m)} />
						</View>
					))}
				</List.Section>
			) : (
				<List.Section>
					<List.Subheader>Objetos</List.Subheader>
					{project.entities.map(e => (
						<View key={e.name}>
							<List.Item title={e.name} onPress={() => addSegment(e)} />
						</View>
					))}
				</List.Section>
			)}
			<Button onPress={reset}>RESET</Button>
			{moveToBottom(<ExpressionDisplay />)}
		</View>
	)
}

const { container } = StyleSheet.create({
	container: { flex: 1 },
})

export default function () {
	return (
		<ProjectProvider>
			<ExpressionProvider>
				<ExpressionMaker />
			</ExpressionProvider>
		</ProjectProvider>
	)
}
