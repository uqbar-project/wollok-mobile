import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { List, Text, withTheme } from 'react-native-paper'
import { Test } from 'wollok-ts/dist/model'
import { MethodDetailsScreenNavigationProp } from '../../pages/EntityMemberDetail'
import { Theme } from '../../theme'
import { stylesheet } from '../entities/Entity/styles'

type Props = {
	test: Test
	theme: Theme
}

function TestItem(props: Props) {
	const styles = stylesheet(props.theme)
	const navigation = useNavigation<MethodDetailsScreenNavigationProp>()
	const goToEntityDetails = () => {
		navigation.navigate('EntityMemberDetails', {
			entityMember: props.test,
			fqn: props.test.fullyQualifiedName(),
		})
	}

	return (
		<List.Item
			onPress={goToEntityDetails}
			key={props.test.name}
			style={styles.item}
			titleStyle={styles.itemTitle}
			title={props.test.name}
			left={() => <Text>"Test Icon"</Text>}
		/>
	)
}

export default withTheme(TestItem)
