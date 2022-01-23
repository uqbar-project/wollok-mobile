import { RouteProp, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Field, is, Method, Module } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../../App'
import { AccordionList } from '../../components/entity-detail/AccordionList'
import AttributeItemComponent from '../../components/entity-detail/AttributeItem/AttributeItem'
import NewAttributeModal from '../../components/entity-detail/new-attribute-modal/NewAttributeModal'
import NewMethodModal from '../../components/entity-detail/new-method-modal/NewMethodModal'
import MultiFabScreen from '../../components/FabScreens/MultiFabScreen'
import { EntityProvider, useEntity } from '../../context/EntityProvider'
import { useProject } from '../../context/ProjectProvider'
import { translate } from '../../utils/translation-helpers'
import { methodLabel } from '../../utils/wollok-helpers'
import {
	MethodDetail,
	MethodDetailsScreenNavigationProp,
} from '../MethodDetail'

export type EntityStackParamList = {
	EntityDetails: undefined
	MethodDetails: { method: Method }
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
					label: upperCaseFirst(translate('entityDetails.attribute')),
					onPress: () => setAttributeModalVisible(true),
				},
				{
					icon: 'code-braces',
					label: upperCaseFirst(translate('entityDetails.method')),
					onPress: () => setMethodModalVisible(true),
				},
			]}>
			<List.Section>
				<ScrollView>
					<AccordionList<Field>
						title={translate('entityDetails.attributes').toUpperCase()}
						items={entity.members.filter(is('Field')) as Field[]}
						VisualItem={AttributeItem}
					/>
					<AccordionList<Method>
						title={translate('entityDetails.methods').toUpperCase()}
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
			onPress={() => navigator.navigate('MethodDetails', { method })}
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
					name="MethodDetails"
					component={MethodDetail}
					options={({ route: methodRoute }) => ({
						title: methodLabel(methodRoute.params.method),
					})}
				/>
			</Stack.Navigator>
		</EntityProvider>
	)
}
