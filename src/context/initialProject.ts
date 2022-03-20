import link from 'wollok-ts/dist/linker'
import {
	Body,
	Describe,
	Environment,
	Field,
	Import,
	Literal,
	Method,
	Package,
	Parameter,
	Reference,
	Send,
	Singleton,
	Test,
} from 'wollok-ts/dist/model'
import { fromJSON } from 'wollok-ts/dist/jsonUtils'
import WRE from 'wollok-ts/dist/wre/wre.json'
import { mainPackageName } from './ProjectProvider'

const pepita = new Singleton({
	name: 'pepita',
	members: [
		new Field({
			name: 'energia',
			isConstant: false,
			isProperty: true,
			value: new Literal({ value: 100 }),
		}),
		new Field({
			name: 'nombre',
			isConstant: true,
			isProperty: true,
			value: new Literal({ value: 'Pepita' }),
		}),
		new Method({
			name: 'estaCansada',
			body: new Body(),
		}),
		new Method({
			name: 'vola',
			body: new Body(),
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
})

const manolo = new Singleton({
	name: 'manolo',
	members: [
		new Method({
			name: 'cambiaDeColor',
			parameters: [
				new Parameter({
					name: 'color',
				}),
			],
			body: new Body(),
		}),
		new Method({
			name: 'moveteA',
			parameters: [
				new Parameter({
					name: 'posX',
				}),
				new Parameter({
					name: 'posY',
				}),
			],
			body: new Body(),
		}),
	],
})

const describe = new Describe({
	name: 'Main Describe',
	members: [
		new Test({
			name: 'Passed',
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
		new Test({
			name: 'Failure',
			body: new Body({
				sentences: [
					new Send({
						receiver: new Reference({ name: 'assert' }),
						message: 'that',
						args: [new Literal({ value: false })],
					}),
				],
			}),
		}),
		new Test({
			name: 'Error',
			body: new Body({
				sentences: [
					new Send({
						receiver: new Reference({ name: 'assert' }),
						message: 'asd',
					}),
				],
			}),
		}),
	],
})

const mainModules = [pepita, manolo]
const mainDescribe = describe

export function templateProject(): Environment {
	const mainImport = [
		new Import({
			entity: new Reference({ name: mainPackageName }),
			isGeneric: true,
		}),
	]
	const main = new Package({ name: 'main', members: mainModules })

	const tests = new Package({
		name: 'tests',
		members: [mainDescribe],
		imports: mainImport,
	})
	return link([main, tests], fromJSON<Environment>(WRE))
}
