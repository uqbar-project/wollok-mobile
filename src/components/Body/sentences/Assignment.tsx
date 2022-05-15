import React from 'react'
import { Assignment as AssignmentModel } from 'wollok-ts/dist/model'
import { ReferenceSegment } from '../../expressions/expression-segment'
import { display } from '../../expressions/ExpressionDisplay'
import { ProblemReporterButton } from '../../problems/ProblemReporterButton'
import { Row } from '../../ui/Row'
import { ReferenceExpression } from './ReferenceExpression'

export const Assignment = ({ assignment }: { assignment: AssignmentModel }) => {
	return (
		<Row style={display}>
			<ProblemReporterButton node={assignment} />
			<ReferenceSegment text={assignment.variable.name} index={0} />
			<ReferenceExpression expression={assignment.value} />
		</Row>
	)
}