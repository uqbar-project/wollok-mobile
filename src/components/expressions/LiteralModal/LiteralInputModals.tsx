import React, { FC, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Literal, LiteralValue } from 'wollok-ts/dist/model'
import { ExpressionOnSubmit } from '../../../pages/ExpressionMaker/ExpressionMaker'
import FormModal from '../../ui/FormModal/FormModal'

type LiteralValueModalProps = {
	visible: boolean
	setVisible: (value: boolean) => void
	setExpression: ExpressionOnSubmit
}

const literalValueModal = function <T extends LiteralValue>(
	Input: FC<{ setValue: (value: T) => void; value: T | undefined }>,
) {
	return function (props: LiteralValueModalProps) {
		const [value, setValue] = useState<T>()

		return (
			<FormModal
				{...props}
				onSubmit={() => {
					if (value !== undefined) {
						props.setExpression(new Literal({ value: value as LiteralValue }))
					}
				}}>
				<Input value={value} setValue={setValue} />
			</FormModal>
		)
	}
}

export const NumberInputModal = literalValueModal<number>(
	({ setValue, value }) => (
		<TextInput
			keyboardType="numeric"
			value={value ? value.toString() : ''}
			onChangeText={text => {
				setValue(Number.parseFloat(text))
			}}
		/>
	),
)

export const TextInputModal = literalValueModal<string>(
	({ setValue, value }) => <TextInput onChangeText={setValue} value={value} />,
)
