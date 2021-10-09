import { Entity } from '../../models/entity'
import { Project } from '../../models/project'
import { PayloadAction } from './type-helpers'

type Action = PayloadAction<'addEntity', Entity>

export function projectReducer(state: Project, action: Action) {
	switch (action.type) {
		case 'addEntity':
			return [...state, action.payload]
		default:
			throw new Error(`Unhandled action type: ${action.type}`)
	}
}
