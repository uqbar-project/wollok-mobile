import { Method } from '../method'

export interface Segment {
	methods: Method[]
}

export class Expression {
	constructor(public readonly segments: Segment[] = []) {}

	addSegment(segment: Segment): Expression {
		return new Expression([...this.segments, segment])
	}
}
