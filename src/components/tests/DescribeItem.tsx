import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { List, Text, withTheme } from 'react-native-paper'
import { Describe } from 'wollok-ts/dist/model'
import { Theme } from '../../theme'
import { stylesheet } from '../entities/Entity/styles'

type Props = {
	describe: Describe
	theme: Theme
}

// TODO: Merge with Entity component
function DescribeItem({ describe, theme }: Props) {
	const styles = stylesheet(theme)
	const navigation = useNavigation()
	const goToEntityDetails = () => {
		navigation.navigate('EntityStack', {
			entityFQN: describe.fullyQualifiedName(),
		})
	}

	return (
		<List.Item
			onPress={goToEntityDetails}
			key={describe.name}
			style={styles.item}
			titleStyle={styles.itemTitle}
			title={describe.name}
			left={() => <Text>"Test Describe"</Text>}
		/>
	)
}

export default withTheme(DescribeItem)
