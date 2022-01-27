import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { IconButton, List } from 'react-native-paper'
import { upperCaseFirst } from 'upper-case-first'
import { Test } from 'wollok-ts/dist/model'
import MultiFabScreen from '../components/FabScreens/MultiFabScreen'
import NewTestModal from '../components/tests/NewTestModal'
import { useEntity } from '../context/EntityProvider'
import { wTranslate } from '../utils/translation-helpers'
import { Maybe } from '../utils/type-helpers'
import { MethodDetailsScreenNavigationProp } from './EntityMemberDetail'

export const Tests = function () {
	const [testModalVisible, setTestModalVisible] = useState(false)
	const { entity } = useEntity()
	const tests = entity.members as Test[]

	return (
		<MultiFabScreen
			actions={[
				{
					icon: 'test-tube',
					label: upperCaseFirst(wTranslate('describe.newTest')),
					onPress: () => setTestModalVisible(true),
				},
			]}>
			<List.Section>
				<ScrollView>
					{tests.map(test => (
						<TestItem key={test.id} item={test} />
					))}
				</ScrollView>
			</List.Section>
			<NewTestModal
				visible={testModalVisible}
				setVisible={setTestModalVisible}
			/>
		</MultiFabScreen>
	)
}

function TestItem({ item: test }: { item: Test }) {
	const navigator = useNavigation<MethodDetailsScreenNavigationProp>()
	const [passed, setPassed] = useState<Maybe<boolean>>(undefined)
	const icon =
		passed === undefined
			? 'test-tube-empty'
			: passed
			? 'test-tube'
			: 'test-tube-off'
	return (
		<List.Item
			title={test.name}
			left={() => (
				<IconButton
					// color={checked ? theme.colors.accent : theme.colors.backdrop}
					icon={icon}
					onPress={() => setPassed(true)}
				/>
			)}
			onPress={() =>
				navigator.navigate('EntityMemberDetails', {
					entityMember: test,
					fqn: test.fullyQualifiedName(),
				})
			}
		/>
	)
}
