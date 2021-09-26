export class Method {
	constructor(public name: string, public parameters: string[]) {}

	get description() {
		return `${this.name}(${this.parameters.join(', ')})`
	}

	get key() {
		return this.name
	}
}
