import { Method } from '../method'
import {
	Literal as LiteralNode,
	LiteralValue,
	Node,
} from 'wollok-ts/dist/model'

export interface Segment {
	methods: Method[]
	node: Node
}

// export class NamedSingleton implements Segment {
// 	readonly kind = 'Singleton'
// 	constructor(readonly entity: Entity) {}
// 	get methods(): Method[] {
// 		return this.entity.methods
// 	}

// 	get node(){
// 		return
// 	}
// }

export class Literal implements Segment {
	readonly kind = 'Literal'
	constructor(readonly value: LiteralValue) {}

	get methods(): Method[] {
		return []
	}

	get node() {
		return new LiteralNode({ value: this.value })
	}
}

// export class MethodSegment implements Segment {
// 	readonly kind = 'Method'
// 	constructor(readonly method: Method) {}

// 	get methods(): Method[] {
// 		return []
// 	}
// }
