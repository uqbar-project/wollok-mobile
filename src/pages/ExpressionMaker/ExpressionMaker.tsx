import { RouteProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, List, Text } from 'react-native-paper'
import {
	Expression,
	Literal,
	Package,
	Reference,
	Send,
} from 'wollok-ts/dist/model'
import { RootStackParamList } from '../../App'
import { ExpressionDisplay } from '../../components/expressions/ExpressionDisplay'
import {
	NumberInputModal,
	TextInputModal,
} from '../../components/expressions/LiteralModal/LiteralInputModals'
import { useExpression } from '../../context/ExpressionProvider'
import { useProject } from '../../context/ProjectProvider'
import { translate } from '../../utils/translation-helpers'
import { allMethods, isNamedSingleton } from '../../utils/wollok-helpers'

export type ExpressionMakerProp = RouteProp<
	RootStackParamList,
	'ExpressionMaker'
>

function ExpressionMaker() {
	const {
		expression,
		actions: { reset, setExpression },
	} = useExpression()
	const [showNumberModal, setShowNumberModal] = useState(false)
	const [showTextModal, setShowTextModal] = useState(false)

	return (
		<View>
			<ExpressionDisplay backgroundColor="white" expression={expression} />
			<ScrollView style={styles.view}>
				{expression ? (
					<List.Section>
						<List.Subheader>{translate('expression.messages')}</List.Subheader>
						<ListMessages expression={expression} setMessage={setExpression} />
					</List.Section>
				) : (
					<List.Section>
						<List.Subheader>
							{translate('expression.mainObjects')}
						</List.Subheader>
						<ListObjectsReferences
							packageName="main"
							setReference={setExpression}
						/>
						<List.Subheader>{translate('expression.literals')}</List.Subheader>
						<List.Item
							title={translate('expression.aNumber')}
							onPress={() => setShowNumberModal(true)}
						/>
						<List.Item
							title={translate('expression.aString')}
							onPress={() => setShowTextModal(true)}
						/>
						<List.Item
							title={translate('expression.true')}
							onPress={() => setExpression(new Literal({ value: true }))}
						/>
						<List.Item
							title={translate('expression.false')}
							onPress={() => setExpression(new Literal({ value: false }))}
						/>
						<List.Item
							title={translate('expression.null')}
							onPress={() => setExpression(new Literal({ value: null }))}
						/>
						<List.Subheader>
							{translate('expression.wollokObjects')}
						</List.Subheader>
						<ListObjectsReferences
							packageName="wollok"
							setReference={setExpression}
						/>
					</List.Section>
				)}
				<Button onPress={reset}>
					{translate('clear').toLocaleUpperCase()}
				</Button>
				<NumberInputModal
					visible={showNumberModal}
					setVisible={setShowNumberModal}
				/>
				<TextInputModal visible={showTextModal} setVisible={setShowTextModal} />
			</ScrollView>
		</View>
	)
}

type ListObjectsReferencesProps = {
	packageName: string
	setReference: (ref: Expression) => void
}
function ListObjectsReferences({
	packageName,
	setReference,
}: ListObjectsReferencesProps) {
	const { project } = useProject()

	// TODO: Add variables
	return (
		<>
			{project
				.getNodeByFQN<Package>(packageName)
				.descendants()
				.filter(isNamedSingleton)
				.map(({ id, name }) => (
					<List.Item
						key={id}
						title={name}
						onPress={() => setReference(new Reference({ name: name! }))}
					/>
				))}
		</>
	)
}

type ListMessagesProps = {
	expression: Expression
	setMessage: (ref: Expression) => void
}
function ListMessages({ expression, setMessage }: ListMessagesProps) {
	const { project } = useProject()
	// TODO: This is a workaroud, use scopes?
	const globalSingletons = project.descendants().filter(isNamedSingleton)

	switch (expression.kind) {
		case 'Reference':
			const singleton = globalSingletons.find(s => s.name === expression.name)
			return singleton ? (
				<>
					{allMethods(singleton).map(({ id, name }) => (
						<List.Item
							key={id}
							title={name}
							onPress={() =>
								// TODO: Open Message modal
								setMessage(new Send({ receiver: expression, message: name }))
							}
						/>
					))}
				</>
			) : (
				<Text>{`No se pudo resolver la referencia ${expression.name}`}</Text>
			)

		default:
			return <Text>{`Todavía no hay mensajes para ${expression.kind}`}</Text>
	}
}

const styles = StyleSheet.create({
	view: { display: 'flex', maxHeight: '94%' },
})

export default ExpressionMaker
