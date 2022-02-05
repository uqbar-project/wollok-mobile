import { WeakRef as WeakRefDef } from './WeakRef'

declare module global {
	interface Global {
		WeakRef: typeof WeakRefDef
	}
}

declare var WeakRef: typeof WeakRefDef
