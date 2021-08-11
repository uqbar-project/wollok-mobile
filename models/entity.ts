import { Module } from 'wollok-ts/dist/model'
import { Method } from './method'
import { Attribute } from './parameter'

export type Kind = Module['kind']

export class Entity {
	constructor(
		public name: string,
		public kind: Kind,
		public methods: Method[] = [],
		public attributes: Attribute[] = [],
	) {}

	addAttribute(attribute: Attribute){
		this.attributes.push(attribute)
	}

	addMethod(method: Method) {
		this.methods.push(method)
	}
}
