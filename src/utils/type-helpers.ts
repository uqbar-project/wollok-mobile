export type OneOrMany<T> = T | T[]

export type Mutable<T> = {
	-readonly [K in keyof T]: T[K]
}

export type Maybe<T> = T | undefined

export type ParentComponentProp<T = {}> = T & JSX.ElementChildrenAttribute

export type Visible = {
	visible: boolean
	setVisible: (value: boolean) => void
}

export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>
