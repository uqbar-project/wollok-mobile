import { RouteProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, List } from 'react-native-paper'
import { RootStackParamList } from '../../App'
import { ExpressionDisplay } from '../../components/expressions/ExpressionDisplay'
import {
	NumberInputModal,
	TextInputModal,
} from '../../components/expressions/LiteralModal/LiteralInputModals'
import { useExpression } from '../../context/ExpressionProvider'
import { Literal } from '../../models/expression/segments'
import { translate } from '../../utils/translation-helpers'

export type ExpressionMakerProp = RouteProp<
	RootStackParamList,
	'ExpressionMaker'
>

function ExpressionMaker() {
	const {
		expression,
		actions: { reset, addSegment },
	} = useExpression()
	const [showNumberModal, setShowNumberModal] = useState(false)
	const [showTextModal, setShowTextModal] = useState(false)

	return (
		<View>
			<ExpressionDisplay backgroundColor="white" expression={expression} />
			{expression.segments.length > 0 ? (
				<List.Section>
					<List.Subheader>{translate('expression.messages')}</List.Subheader>
				</List.Section>
			) : (
				<List.Section>
					<List.Subheader>{translate('expression.objects')}</List.Subheader>

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
						title="True"
						onPress={() => addSegment(new Literal(true))}
					/>
					<List.Item
						title="False"
						onPress={() => addSegment(new Literal(false))}
					/>
				</List.Section>
			)}
			<Button onPress={reset}>{translate('clear').toLocaleUpperCase()}</Button>
			<NumberInputModal
				visible={showNumberModal}
				setVisible={setShowNumberModal}
			/>
			<TextInputModal visible={showTextModal} setVisible={setShowTextModal} />
		</View>
	)
}

export default ExpressionMaker
