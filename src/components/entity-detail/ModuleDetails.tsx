import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Describe, Field, is, Method, Module } from 'wollok-ts/dist/model'
import { AccordionList } from './AccordionList'
import AttributeItemComponent from './AttributeItem/AttributeItem'
import NewAttributeModal from './new-attribute-modal/NewAttributeModal'
import NewMethodModal from './new-method-modal/NewMethodModal'
import MultiFabScreen from '../FabScreens/MultiFabScreen'
import { ProblemReporterButton } from '../problems/ProblemReporterButton'
import { useProject } from '../../context/ProjectProvider'
import { wTranslate } from '../../utils/translation-helpers'
import { methodFQN, methodLabel } from '../../utils/wollok-helpers'
import { EditorScreenNavigationProp } from '../../pages/Editor'

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
			<NewMethodModal
				visible={methodModalVisible}
				setVisible={setMethodModalVisible}
				addNewMethod={addMember(module)}
			/>
			<NewAttributeModal
				setVisible={setAttributeModalVisible}
				visible={attributeModalVisible}
				addNewField={addMember(module)}
				contextFQN={module.fullyQualifiedName()}
			/>
		</MultiFabScreen>
	)
}

function AttributeItem({ item: attribute }: { item: Field }) {
	return <AttributeItemComponent key={attribute.name} attribute={attribute} />
}

function MethodItem({ item: method }: { item: Method }) {
	const navigator = useNavigation<EditorScreenNavigationProp>()
	function gotoMethod() {
		navigator.navigate('Editor', {
			fqn: methodFQN(method),
		})
	}
	return (
		<List.Item
			key={method.name}
			title={methodLabel(method)}
			left={() => <ProblemReporterButton node={method} />}
			onPress={gotoMethod}
		/>
	)
}
