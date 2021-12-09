import { Method } from './method'
import { Entity } from './entity'

export type Segment = Method | Entity

export class Expression {
	constructor(public readonly segments: Segment[] = []) {}

	addSegment(segment: Segment): Expression {
		return new Expression([...this.segments, segment])
	}
}
