// TODO: import form Wollok
// All these funtions are duplicated from Wollok
import {
	Field,
	is,
	List,
	Method,
	Module,
	Node,
	Singleton,
	Test,
	Variable,
} from 'wollok-ts/dist/model'

export function allFields(module: Module): List<Field> {
	return module.hierarchy().flatMap(parent => parent.fields())
}

export function allMethods(module: Module): List<Method> {
	return module.hierarchy().flatMap(parent => parent.methods())
}

export function allVariables(node: Method | Test): List<Variable> {
	return node.sentences().filter(is('Variable'))
}

export function isNamedSingleton(node: Node): node is Singleton {
	return node.is('Singleton') && !!node.name
}
