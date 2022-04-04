import React from 'react'
import { IconButton } from 'react-native-paper'
import { Assignment as AssignmentModel } from 'wollok-ts/dist/model'
import { ReferenceSegment } from '../../../expressions/expression-segment'
import {
	display,
	ExpressionDisplay,
} from '../../../expressions/ExpressionDisplay'
import { Row } from '../../Row'

export const Assignment = ({ assignment }: { assignment: AssignmentModel }) => {
	return (
		<Row style={display}>
			<ReferenceSegment text={assignment.variable.name} index={0} />
			<IconButton icon="arrow-right" />
			<ExpressionDisplay expression={assignment.value} withIcon={false} />
		</Row>
	)
}
