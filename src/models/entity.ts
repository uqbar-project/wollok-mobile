import { Module } from 'wollok-ts/dist/model'
import { Method } from './method'
import { Attribute } from './attribute'

export type Kind = Module['kind']

export class Entity {
	constructor(
		public name: string,
		public kind: Kind,
		public methods: Method[] = [],
		public attributes: Attribute[] = [],
	) {}

	addAttribute(attribute: Attribute) {
		return new Entity(this.name, this.kind, this.methods, [
			...this.attributes,
			attribute,
		])
	}

	addMethod(method: Method) {
		return new Entity(
			this.name,
			this.kind,
			[...this.methods, method],
			this.attributes,
		)
	}
}
