import { Segment } from './segments'

export class Expression {
	constructor(public readonly segments: Segment[] = []) {}

	addSegment(segment: Segment): Expression {
		return new Expression([...this.segments, segment])
	}

	isEmpty() {
		return this.segments.length === 0
	}
}
