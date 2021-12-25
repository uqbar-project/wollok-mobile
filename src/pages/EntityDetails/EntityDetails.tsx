import { RouteProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { RootStackParamList } from '../../App'
import { AccordionList } from '../../components/entity-detail/AccordionList'
import AttributeItem from '../../components/entity-detail/AttributeItem'
import NewAttributeModal from '../../components/entity-detail/new-attribute-modal/NewAttributeModal'
import NewMethodModal from '../../components/entity-detail/new-method-modal/NewMethodModal'
import MultiFabScreen from '../../components/FabScreens/MultiFabScreen'
import { Method } from '../../models/method'
import { Attribute } from '../../models/attribute'
import { translate } from '../../utils/translation-helpers'
import { EntityProvider, useEntity } from '../../context/EntityProvider'

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
					<AccordionList<Attribute>
						title={translate('entityDetails.attributes').toUpperCase()}
						items={entity.attributes}
						getVisualItem={attributeItem}
					/>
					<AccordionList<Method>
						title={translate('entityDetails.methods').toUpperCase()}
						items={entity.methods}
						getVisualItem={methodItem}
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

function attributeItem(attribute: Attribute): Element {
	return <AttributeItem key={attribute.name} attribute={attribute} />
}

function methodItem(method: Method): Element {
	return <List.Item key={method.name} title={method.description} />
}

export default function (props: { route: Route }) {
	return (
		<EntityProvider initialEntity={props.route.params.entity}>
			<EntityDetails />
		</EntityProvider>
	)
}
