import React, { FC, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { LiteralValue } from 'wollok-ts/dist/model'
import { useExpression } from '../../../context/ExpressionProvider'
import { Literal } from '../../../models/expression/segments'
import FormModal from '../../ui/FormModal/FormModal'

type LiteralValueModalProps = {
	visible: boolean
	setVisible: (value: boolean) => void
}

const literalValueModal = function <T extends LiteralValue>(
	Input: FC<{ setValue: (value: T) => void; value: T | undefined }>,
) {
	return function (props: LiteralValueModalProps) {
		const {
			actions: { addSegment },
		} = useExpression()
		const [value, setValue] = useState<T>()

		return (
			<FormModal {...props} onSubmit={() => addSegment(new Literal(value!))}>
				<Input value={value} setValue={setValue} />
			</FormModal>
		)
	}
}

export const NumberInputModal = literalValueModal<number>(({ setValue }) => (
	<TextInput
		keyboardType="numeric"
		onChangeText={text => {
			setValue(Number.parseFloat(text))
		}}
	/>
))

export const TextInputModal = literalValueModal<string>(({ setValue }) => (
	<TextInput onChangeText={setValue} />
))
