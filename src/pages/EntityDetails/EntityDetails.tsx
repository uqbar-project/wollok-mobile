import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Field, is, Method } from 'wollok-ts/dist/model'
import { AccordionList } from '../../components/entity-detail/AccordionList'
import AttributeItemComponent from '../../components/entity-detail/AttributeItem/AttributeItem'
import NewAttributeModal from '../../components/entity-detail/new-attribute-modal/NewAttributeModal'
import NewMethodModal from '../../components/entity-detail/new-method-modal/NewMethodModal'
import MultiFabScreen from '../../components/FabScreens/MultiFabScreen'
import { useEntity } from '../../context/EntityProvider'
import { wTranslate } from '../../utils/translation-helpers'
import { methodFQN, methodLabel } from '../../utils/wollok-helpers'
import { EntityMemberScreenNavigationProp } from '../EntityMemberDetail'

export const EntityDetails = function () {
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
	const navigator = useNavigation<EntityMemberScreenNavigationProp>()
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
