import { Method } from '../method'
import { Segment } from './expression'
import { Literal as LiteralNode } from 'wollok-ts/dist/model'

export class Literal implements Segment {
	constructor(readonly value: string | boolean | number) {}

	get methods(): Method[] {
		return []
	}

	get node() {
		return new LiteralNode({ value: this.value })
	}
}

export class MethodSegment implements Segment {
	constructor(readonly method: Method) {}

	get methods(): Method[] {
		return []
	}
}
