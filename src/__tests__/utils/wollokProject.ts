import {
	Body,
	Class,
	Describe,
	Environment,
	Expression,
	Field,
	Import,
	link,
	Literal,
	Method,
	Node,
	Package,
	Parameter,
	Problem,
	Reference,
	Return,
	Send,
	Singleton,
	Test,
	WRE,
} from 'wollok-ts'
import { fromJSON } from 'wollok-ts/dist/jsonUtils'

const main = new Package({
	name: 'main',
	members: [
		new Singleton({
			name: 'pepita',
			members: [
				new Field({
					name: 'energia',
					isConstant: false,
					isProperty: true,
					value: new Literal({ value: 100 }),
				}),
				new Method({
					name: 'come',
					parameters: [
						new Parameter({
							name: 'comida',
						}),
					],
					body: new Body({
						sentences: [
							new Send({
								receiver: new Reference({ name: 'comida' }),
								message: 'energiaQueAporta',
							}),
						],
					}),
				}),
			],
		}),
		new Class({
			name: 'Entrenador',
		}),
	],
})

const tests = new Package({
	name: 'tests',
	imports: [
		new Import({
			entity: new Reference({ name: 'main' }),
			isGeneric: true,
		}),
	],
	members: [
		new Describe({
			name: 'Main Describe',
			members: [
				new Test({
					id: 'TEST',
					name: 'test for testing',
					body: new Body({
						sentences: [
							new Send({
								receiver: new Reference({ name: 'assert' }),
								message: 'that',
								args: [new Literal({ value: true })],
							}),
						],
					}),
				}),
			],
		}),
	],
})

export const project = link([main, tests], fromJSON<Environment>(WRE))

export const singleton = project.getNodeByFQN('main.pepita') as Singleton

export const clazz = project.getNodeByFQN('main.Entrenador') as Singleton

export const describe = project.getNodeByFQN('tests.Main Describe') as Describe

export const field = singleton.members[0] as Field

export const method = singleton.members[1] as Method

export const test = describe.members[0] as Test

export const sentence = method.sentences()[0]

export const wReturn = new Return({ value: sentence as Expression })

// PROBLEMS

export const problem = (node: Node): Problem => ({
	node,
	code: 'ERROR',
	level: 'error',
	values: [],
})

export const error = problem(sentence)

export const warning: Problem = {
	node: singleton,
	code: 'SINGLETON_WARNING',
	level: 'warning',
	values: [],
}
