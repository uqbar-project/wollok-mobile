/* eslint no-undef: "off" */
export class WeakRef<T> {
	constructor(private object: T) {
		console.log(`weakref: ${object}`)
	}

	deref() {
		return this.object
	}
}

//@ts-ignore
globalThis.WeakRef = WeakRef
