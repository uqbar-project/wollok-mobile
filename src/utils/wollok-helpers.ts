// TODO: import form Wollok
// All these funtions are duplicated from Wollok
import {
	Field,
	is,
	List,
	Method,
	Module,
	Test,
	Variable,
} from 'wollok-ts/dist/model'

export function allFields(module: Module): List<Field> {
	return module.hierarchy().flatMap(parent => parent.fields())
}

export function allVariables(node: Method | Test): List<Variable> {
	return node.sentences().filter(is('Variable'))
}
