import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Body } from 'wollok-ts/dist/model'
import { BodyMaker } from '../components/ui/Body/BodyMaker'
import { useEntity } from '../context/EntityProvider'
import {
	allScopedVariables,
	EntityMemberWithBody,
} from '../utils/wollok-helpers'
import { EntityStackParamList } from './EntityDetails/EntityDetails'

export type MethodDetailsScreenNavigationProp = StackNavigationProp<
	EntityStackParamList,
	'EntityMemberDetails'
>

type Route = RouteProp<EntityStackParamList, 'EntityMemberDetails'>

export const EntityMemberDetail = ({
	route: {
		params: { entityMember, fqn },
	},
}: {
	route: Route
}) => {
	const {
		actions: { changeMember },
	} = useEntity()

	function setBody(body: Body) {
		changeMember(
			entityMember,
			entityMember.copy({ body }) as EntityMemberWithBody,
		)
	}

	return (
		<BodyMaker
			sentences={entityMember.sentences()}
			variables={allScopedVariables(entityMember)}
			contextFQN={fqn}
			setBody={setBody}
		/>
	)
}
