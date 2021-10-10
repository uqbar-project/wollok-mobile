import { Entity } from './entity'

//TODO: Make a class?
export interface Project {
	entities: Entity[]
	addEntity: (entity: Entity) => void
}
