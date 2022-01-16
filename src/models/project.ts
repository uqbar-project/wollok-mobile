import { Entity } from './entity'

export class Project {
	constructor(public readonly entities: Entity[] = []) {}

	addEntity(entity: Entity) {
		this.entities.push(entity)
	}
}
