export type OneOrMany<T> = T | T[]

export type Mutable<T> = {
	-readonly [K in keyof T]: T[K]
}

export type Maybe<T> = T | undefined

export type ParentComponentProp<T = {}> = T & {
	children: OneOrMany<JSX.Element>
}
