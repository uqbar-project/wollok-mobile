import { Module } from 'wollok-ts/dist/model'

export type Kind = Module['kind']

export class Entity {
	constructor(
		public name: string,
		public kind: Kind,
		public methods: Method[] = [],
		public attributes: Attribute[] = [],
	) {}

	addMethod(method: Method) {
		this.methods.push(method)
	}
}

export class Method {
	constructor(public name: string, public parameters: string[]) {}

	get description() {
		return `${this.name}(${this.parameters.join(', ')})`
	}
}

export class Attribute {
	constructor(public name: string) {}

	get description() {
		return this.name
	}
}
