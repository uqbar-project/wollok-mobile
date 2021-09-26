export class Attribute {
	constructor(public name: string, public constant: boolean, public property: boolean) {}

	get description() {
		return this.name
	}

	get key(){
		return this.name
	}
}