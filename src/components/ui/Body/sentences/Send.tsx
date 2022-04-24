import React from 'react'
import { Send as SendModel } from 'wollok-ts/dist/model'
import { ExpressionDisplay } from '../../../expressions/ExpressionDisplay'
import { ProblemReporterButton } from '../../../problems/ProblemReporterButton'
import { Row } from '../../Row'

export const Send = ({ send }: { send: SendModel }) => {
	return (
		<Row>
			<ProblemReporterButton node={send} />
			<ExpressionDisplay expression={send} withIcon={false} />
		</Row>
	)
}
