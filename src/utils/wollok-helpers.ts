// TODO: import form Wollok
// All these funtions are duplicated from Wollok
import { upperCaseFirst } from 'upper-case-first'
import {
	Environment,
	Field,
	is,
	List,
	Literal,
	Method,
	Module,
	Name,
	Node,
	Singleton,
	Test,
	Variable,
} from 'wollok-ts/dist/model'
import { last } from './commons'

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

export function methodLabel(method: Method) {
	return `${method.name}(${method.parameters.map(_ => _.name).join(',')})`
}

export function literalClassFQN(literal: Literal): Name {
	return `wollok.lang.${upperCaseFirst(typeof literal.value)}`
}

export function allScopedVariables(method: Method) {
	const fields = allFields(method.parent())
	const params = method.parameters
	const methodVars = allVariables(method)

	return [...fields, ...params, ...methodVars]
}

export function methodFQN(method: Method) {
	return `${method.parent().fullyQualifiedName()}.${method.name}/${
		method.parameters.length
	}`
}

export function isMethodFQN(fqn: Name) {
	return fqn.includes('/')
}

export function methodByFQN(environment: Environment, fqn: Name): Method {
	const parts = fqn.split('.')

	const methodWithArity = last(parts)

	const [methodName, methodArity] = methodWithArity!.split('/')

	const entityFQN = fqn.replace(`.${methodWithArity}`, '')

	const entity = environment.getNodeByFQN<Module>(entityFQN)

	return entity.lookupMethod(methodName, Number.parseInt(methodArity))!
}
