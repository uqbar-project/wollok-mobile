import {
	Body,
	Describe,
	Field,
	Literal,
	Method,
	Parameter,
	Reference,
	Send,
	Singleton,
} from 'wollok-ts/dist/model'

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

const describe = new Describe({ name: 'Main Describe' })

export const mainModules = [pepita, manolo]
export const mainDescribe = describe
