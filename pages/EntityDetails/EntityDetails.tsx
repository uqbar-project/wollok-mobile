import { RouteProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { List } from 'react-native-paper'
import { RootStackParamList } from '../../App'
import AccordionList from '../../components/entity-detail/AccordionList'
import NewMethodModal from '../../components/entity-detail/new-method-modal/NewMethodModal'
import MultiFabScreen from '../../components/FabScreens/MultiFabScreen'
import { Method } from '../../models/entity'

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
					label: 'Atributo',
					onPress: () => setAttributeModalVisible(true),
				},
				{
					icon: 'code-braces',
					label: 'Metodo',
					onPress: () => setMethodModalVisible(true),
				},
			]}>
			<List.Section>
				<AccordionList title="ATRIBUTOS" items={entity.attributes} />
				<AccordionList title="METODOS" items={entity.methods} />
			</List.Section>
			<NewMethodModal
				addMethod={addMethod}
				visible={methodModalVisible}
				setVisible={setMethodModalVisible}
			/>
		</MultiFabScreen>
	)

	function addMethod(method: Method) {
		entity.addMethod(method)
	}
}
