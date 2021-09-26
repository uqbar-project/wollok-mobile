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

export default function (props: {
	route: RouteProp<RootStackParamList, 'EntityDetails'>
}) {
	const [methodModalVisible, setMethodModalVisible] = useState(false)
	const [attributeModalVisible, setAttributeModalVisible] = useState(false)
	const { entity } = props.route.params

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
				addMethod={addMethod}
				visible={methodModalVisible}
				setVisible={setMethodModalVisible}
			/>
			<NewAttributeModal
				onSubmit={addAttribute}
				setVisible={setAttributeModalVisible}
				visible={attributeModalVisible}
			/>
		</MultiFabScreen>
	)

	function addMethod(method: Method) {
		entity.addMethod(method)
	}

	function addAttribute(attribute: Attribute) {
		entity.addAttribute(attribute)
	}
}

function attributeItem(attribute: Attribute): Element {
	return (
		<AttributeItem key={attribute.name} attribute={attribute}></AttributeItem>
	)
}

function methodItem(method: Method): Element {
	return <List.Item key={method.name} title={method.description} />
}
