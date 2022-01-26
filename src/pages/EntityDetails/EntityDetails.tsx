import { RouteProp, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import {
	Expression,
	Field,
	is,
	Method,
	Module,
	Name,
	Send,
} from 'wollok-ts/dist/model'
import { RootStackParamList } from '../../App'
import { AccordionList } from '../../components/entity-detail/AccordionList'
import AttributeItemComponent from '../../components/entity-detail/AttributeItem/AttributeItem'
import NewAttributeModal from '../../components/entity-detail/new-attribute-modal/NewAttributeModal'
import NewMethodModal from '../../components/entity-detail/new-method-modal/NewMethodModal'
import MultiFabScreen from '../../components/FabScreens/MultiFabScreen'
import { EntityProvider, useEntity } from '../../context/EntityProvider'
import { useProject } from '../../context/ProjectProvider'
import { NewMessageCall } from '../../pages/NewMessageCall'
import { wTranslate } from '../../utils/translation-helpers'
import {
	EntityMemberWithBody,
	entityMemberLabel,
	methodFQN,
	methodLabel,
} from '../../utils/wollok-helpers'
import ExpressionMaker, {
	ExpressionOnSubmit,
} from '../ExpressionMaker/ExpressionMaker'
import {
	EntityMemberDetail,
	MethodDetailsScreenNavigationProp,
} from '../EntityMemberDetail'

export type EntityStackParamList = {
	EntityDetails: undefined
	EntityMemberDetails: {
		entityMember: EntityMemberWithBody
		fqn: Name
	}
	ExpressionMaker: {
		onSubmit: ExpressionOnSubmit
		contextFQN: Name
		initialExpression?: Expression
	}
	NewMessageSend: {
		receiver: Expression
		method: Method
		contextFQN: Name
		onSubmit: (s: Send) => void
	}
}

type Route = RouteProp<RootStackParamList, 'EntityStack'>

const EntityDetails = function () {
	const [methodModalVisible, setMethodModalVisible] = useState(false)
	const [attributeModalVisible, setAttributeModalVisible] = useState(false)
	const { entity } = useEntity()

	return (
		<MultiFabScreen
			actions={[
				{
					icon: 'database',
					label: upperCaseFirst(wTranslate('entityDetails.attribute')),
					onPress: () => setAttributeModalVisible(true),
				},
				{
					icon: 'code-braces',
					label: upperCaseFirst(wTranslate('entityDetails.method')),
					onPress: () => setMethodModalVisible(true),
				},
			]}>
			<List.Section>
				<ScrollView>
					<AccordionList<Field>
						title={wTranslate('entityDetails.attributes').toUpperCase()}
						items={entity.members.filter(is('Field')) as Field[]}
						VisualItem={AttributeItem}
					/>
					<AccordionList<Method>
						title={wTranslate('entityDetails.methods').toUpperCase()}
						items={entity.members.filter(is('Method')) as Method[]}
						VisualItem={MethodItem}
					/>
				</ScrollView>
			</List.Section>
			<NewMethodModal
				visible={methodModalVisible}
				setVisible={setMethodModalVisible}
			/>
			<NewAttributeModal
				setVisible={setAttributeModalVisible}
				visible={attributeModalVisible}
			/>
		</MultiFabScreen>
	)
}

function AttributeItem({ item: attribute }: { item: Field }) {
	return <AttributeItemComponent key={attribute.name} attribute={attribute} />
}

function MethodItem({ item: method }: { item: Method }) {
	const navigator = useNavigation<MethodDetailsScreenNavigationProp>()
	return (
		<List.Item
			key={method.name}
			title={methodLabel(method)}
			onPress={() =>
				navigator.navigate('EntityMemberDetails', {
					entityMember: method,
					fqn: methodFQN(method),
				})
			}
		/>
	)
}

export default function (props: { route: Route }) {
	const { project } = useProject()
	const Stack = createStackNavigator<EntityStackParamList>()
	const entity = project.getNodeByFQN<Module>(props.route.params.entityFQN)
	return (
		<EntityProvider entity={entity}>
			<Stack.Navigator>
				<Stack.Screen
					name="EntityDetails"
					component={EntityDetails}
					options={{
						title: entity.name,
						headerTitleAlign: 'center',
						animationEnabled: false,
					}}
				/>
				<Stack.Screen
					name="EntityMemberDetails"
					component={EntityMemberDetail}
					options={({ route: methodRoute }) => ({
						title: entityMemberLabel(methodRoute.params.entityMember),
					})}
				/>
				<Stack.Screen
					name="ExpressionMaker"
					component={ExpressionMaker}
					options={{
						title: wTranslate('expression.title'),
						headerTitleAlign: 'center',
						animationEnabled: false,
					}}
				/>
				<Stack.Screen
					name="NewMessageSend"
					component={NewMessageCall}
					options={route => ({ title: route.route.params.method.name })}
				/>
			</Stack.Navigator>
		</EntityProvider>
	)
}
