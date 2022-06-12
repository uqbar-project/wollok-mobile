// TODO: import form Wollok
// All these funtions are duplicated from Wollok
import { upperCaseFirst } from 'upper-case-first'
import { List } from 'wollok-ts/dist/extensions'
import interpret, {
	DirectedInterpreter,
	ExecutionState,
} from 'wollok-ts/dist/interpreter/interpreter'
import {
	Evaluation,
	WollokException,
} from 'wollok-ts/dist/interpreter/runtimeModel'
import {
	Environment,
	Expression,
	Field,
	is,
	Literal,
	Method,
	Module,
	Name,
	Node,
	Parameter,
	Problem,
	Singleton,
	Test,
	Variable,
} from 'wollok-ts/dist/model'
import WRENatives from 'wollok-ts/dist/wre/wre.natives'
import { last } from './commons'

export type Named = { name: Name }

export type Referenciable = Variable | Field | Parameter

export type CodeContainer = Method | Test

export type EntityMember = CodeContainer | Field

export function allFields(module: Module): List<Field> {
	return module.hierarchy().flatMap(parent => parent.fields())
}

export function allMethods(module: Module): List<Method> {
	return module.hierarchy().flatMap(parent => parent.methods())
}

export function allVariables(node: Method | Test): List<Variable> {
	return node.sentences().filter(is('Variable'))
}

export function isNamedSingleton(node: Node): node is Singleton & Named {
	return node.is('Singleton') && !!node.name
}

export function methodLabel(method: Method): string {
	return `${method.name}(${method.parameters.map(_ => _.name).join(',')})`
}

export function literalClassFQN(literal: Literal): Name {
	return `wollok.lang.${upperCaseFirst(typeof literal.value)}`
}

export function allScopedVariables(node: CodeContainer): Referenciable[] {
	const fields = allFields(node.parent)
	const params = node.is('Method') ? node.parameters : []
	const methodVars = allVariables(node)

	return [...fields, ...params, ...methodVars]
}

export function containerOf(node: Node): CodeContainer | undefined {
	if (node.is('Method')) {
		return node
	}
	if (node.is('Test')) {
		return node
	}
	const container = [node, ...node.ancestors()].find(is('Body'))?.parent

	// TODO: If view
	if (container?.is('If')) {
		return containerOf(container)
	}

	return container as CodeContainer
}

// METHODS

export function methodFQN(method: Method) {
	return `${method.parent.fullyQualifiedName()}.${method.name}/${
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

	return entity.lookupMethod(methodName, Number.parseInt(methodArity, 10))!
}

export function entityMemberLabel(node: CodeContainer): string {
	return node.is('Method') ? methodLabel(node) : node.name
}

export function entityMemberFQN(node: CodeContainer): string {
	return node.is('Method') ? methodFQN(node) : node.fullyQualifiedName()
}

export function entityMemberByFQN(
	environment: Environment,
	fqn: Name,
): CodeContainer {
	return isMethodFQN(fqn)
		? methodByFQN(environment, fqn)
		: environment.getNodeByFQN<Test>(fqn)
}

// PROBLEMS

export function isError(problem: Problem): boolean {
	return problem.level === 'error'
}

// TESTS

export type TestResult = 'Passed' | 'Failure' | 'Error'

export type TestRun = { result: TestResult; exception?: WollokException }

export type FinishedExecutionState = ExecutionState<void> & { done: true }

export function interpretTest(test: Test, environment: Environment): TestRun {
	const interpreter = interpret(environment, WRENatives)
	try {
		interpreter.exec(test)
		return { result: 'Passed' }
	} catch (e) {
		const exception = e as WollokException
		const result =
			exception.name === 'wollok.lib.AssertionException' ? 'Failure' : 'Error'
		return { result, exception }
	}
}

export function isNullExpression(expression: Expression): boolean {
	return expression.is('Literal') && expression.value === null
}

export function executionFor(environment: Environment) {
	return new DirectedInterpreter(Evaluation.build(environment, WRENatives))
}

export function projectToJSON(wre: Environment) {
	return JSON.stringify(
		wre,
		(key, value) => (key.startsWith('_') ? undefined : value),
		2,
	)
}
