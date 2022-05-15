import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Describe, Field, is, Method, Module } from 'wollok-ts/dist/model'
import { useProject } from '../../context/ProjectProvider'
import { wTranslate } from '../../utils/translation-helpers'
import MultiFabScreen from '../FabScreens/MultiFabScreen'
import { AccordionList } from './AccordionList'
import AttributeItemComponent from './AttributeItem/AttributeItem'
import { MethodItem } from './MethodItem'
import AttributeFormModal from './new-attribute-modal/AttributeFormModal'
import MethodFormModal from './new-method-modal/MethodFormModal'

export type ModuleDetailsProps = {
	module: Exclude<Module, Describe>
}

export const ModuleDetails = function ({ module }: ModuleDetailsProps) {
	const [methodModalVisible, setMethodModalVisible] = useState(false)
	const [attributeModalVisible, setAttributeModalVisible] = useState(false)
	const {
		actions: { addMember },
	} = useProject()

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
						items={module.members.filter(is('Field')) as Field[]}
						VisualItem={AttributeItem}
						initialExpanded={true}
					/>
					<AccordionList<Method>
						title={wTranslate('entityDetails.methods').toUpperCase()}
						items={module.members.filter(is('Method')) as Method[]}
						VisualItem={MethodItem}
						initialExpanded={true}
					/>
				</ScrollView>
			</List.Section>
			<MethodFormModal
				title={wTranslate('entityDetails.methodModal.newMethod')}
				visible={methodModalVisible}
				setVisible={setMethodModalVisible}
				onSubmit={addMember(module)}
			/>
			<AttributeFormModal
				title={wTranslate('entityDetails.attributeModal.newAttribute')}
				setVisible={setAttributeModalVisible}
				visible={attributeModalVisible}
				onSubmit={addMember(module)}
				contextFQN={module.fullyQualifiedName()}
			/>
		</MultiFabScreen>
	)
}

function AttributeItem({ item: attribute }: { item: Field }) {
	return <AttributeItemComponent key={attribute.name} attribute={attribute} />
}
