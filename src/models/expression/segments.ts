import { Method } from '../method'
import { Kind, Literal as LiteralNode, Node } from 'wollok-ts/dist/model'
import { Entity } from '../entity'

export interface Segment {
	methods: Method[]
	node: Node
	kind: Kind
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
	constructor(readonly value: string | boolean | number) {}

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
