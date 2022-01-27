import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { IconButton, List, withTheme } from 'react-native-paper'
import { Test } from 'wollok-ts/dist/model'
import { useProject } from '../../context/ProjectProvider'
import { MethodDetailsScreenNavigationProp } from '../../pages/EntityMemberDetail'
import { Theme } from '../../theme'
import { Maybe } from '../../utils/type-helpers'

type TestItemProps = {
	item: Test
	theme: Theme
}
function TestItem({ item: test, theme }: TestItemProps) {
	const {
		actions: { runTest },
	} = useProject()
	const [passed, setPassed] = useState<Maybe<boolean>>(undefined)
	const navigator = useNavigation<MethodDetailsScreenNavigationProp>()
	const { icon, color } =
		passed === undefined
			? { icon: 'test-tube-empty', color: theme.colors.disabled }
			: passed
			? { icon: 'test-tube', color: theme.colors.success }
			: { icon: 'test-tube-off', color: theme.colors.error }
	return (
		<List.Item
			title={test.name}
			left={() => (
				<IconButton
					color={color}
					icon={icon}
					onPress={() => {
						setPassed(runTest(test))
					}}
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

export default withTheme(TestItem)
