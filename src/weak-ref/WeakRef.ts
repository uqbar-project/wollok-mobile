import { Platform } from 'react-native'

/* eslint no-undef: "off" */
export class WeakRef<T> {
	constructor(private object: T) {}

	deref() {
		return this.object
	}
}

if (Platform.OS === 'android') {
	//@ts-ignore
	globalThis.WeakRef = WeakRef
}
