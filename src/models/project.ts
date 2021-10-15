import { Entity } from './entity'

export class Project {
	constructor(public readonly entities: Entity[] = []) {}

	addEntity(entity: Entity) {
		return new Project([...this.entities, entity])
	}
}
