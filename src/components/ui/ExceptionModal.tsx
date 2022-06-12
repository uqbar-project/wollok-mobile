import React from 'react'
import { Text } from 'react-native-paper'
import { WollokException } from 'wollok-ts/dist/interpreter/runtimeModel'
import { Visible } from '../../utils/type-helpers'
import FormModal from './FormModal/FormModal'

type ExceptionModalProps = Visible & {
	exception?: WollokException
}

const ExceptionModal = ({
	exception,
	visible,
	setVisible,
}: ExceptionModalProps) => {
	if (!exception) {
		return null
	}

	return (
		<FormModal visible={visible} title={exception.name} setVisible={setVisible}>
			<Text>{exception.message}</Text>
		</FormModal>
	)
}

export default ExceptionModal
