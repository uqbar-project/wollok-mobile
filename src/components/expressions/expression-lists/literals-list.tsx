import React, { useState } from 'react'
import { List } from 'react-native-paper'
import { Expression, Literal } from 'wollok-ts/dist/model'
import { useContext } from '../../../context/ContextProvider'
import { translate } from '../../../utils/translation-helpers'
import {
	NumberInputModal,
	TextInputModal,
} from '../LiteralModal/LiteralInputModals'

type ListLiteralsProps = {
	setLiteral: (ref: Expression) => void
}
export function ListLiterals({ setLiteral }: ListLiteralsProps) {
	const {
		actions: { filterBySearch },
	} = useContext()
	const [showNumberModal, setShowNumberModal] = useState(false)
	const [showTextModal, setShowTextModal] = useState(false)

	const literalsList = [
		{
			name: translate('expression.aNumber'),
			onPress: () => setShowNumberModal(true),
		},
		{
			name: translate('expression.aString'),
			onPress: () => setShowTextModal(true),
		},
		{
			name: translate('expression.true'),
			onPress: () => setLiteral(new Literal({ value: true })),
		},
		{
			name: translate('expression.false'),
			onPress: () => setLiteral(new Literal({ value: false })),
		},
		{
			name: translate('expression.null'),
			onPress: () => setLiteral(new Literal({ value: null })),
		},
	]

	return (
		<>
			{filterBySearch(literalsList).map(({ name, onPress }, i) => (
				<List.Item key={i} title={name} onPress={onPress} />
			))}
			<NumberInputModal
				setExpression={setLiteral}
				visible={showNumberModal}
				setVisible={setShowNumberModal}
			/>
			<TextInputModal
				setExpression={setLiteral}
				visible={showTextModal}
				setVisible={setShowTextModal}
			/>
		</>
	)
}
