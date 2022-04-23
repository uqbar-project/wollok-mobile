import React from 'react'
import { Send as SendModel } from 'wollok-ts/dist/model'
import { ExpressionDisplay } from '../../../expressions/ExpressionDisplay'

export const Send = ({ send }: { send: SendModel }) => {
	return <ExpressionDisplay expression={send} withIcon={false} />
}
