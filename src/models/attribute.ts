import { Expression } from './expression/expression'

export class Attribute {
	constructor(
		public name: string,
		public constant: boolean,
		public property: boolean,
		public initialValue?: Expression,
	) {}

	get description() {
		return this.name
	}

	get key() {
		return this.name
	}
}
