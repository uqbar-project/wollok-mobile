import { RouteProp, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Field, is, Method } from 'wollok-ts/dist/model'
import { RootStackParamList } from '../../App'
import { AccordionList } from '../../components/entity-detail/AccordionList'
import AttributeItemComponent from '../../components/entity-detail/AttributeItem/AttributeItem'
import NewAttributeModal from '../../components/entity-detail/new-attribute-modal/NewAttributeModal'
import NewMethodModal from '../../components/entity-detail/new-method-modal/NewMethodModal'
import MultiFabScreen from '../../components/FabScreens/MultiFabScreen'
import { EntityProvider, useEntity } from '../../context/EntityProvider'
import { translate } from '../../utils/translation-helpers'
import { MethodDetailsScreenNavigationProp } from '../MethodDetail'

type Route = RouteProp<RootStackParamList, 'EntityDetails'>

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
			title={`${method.name}(${method.parameters.map(_ => _.name)})`}
			onPress={() => navigator.navigate('MethodDetails', { method })}
		/>
	)
}

export default function (props: { route: Route }) {
	return (
		<EntityProvider entity={props.route.params.entity}>
			<EntityDetails />
		</EntityProvider>
	)
}
