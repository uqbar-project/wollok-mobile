import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { List, withTheme } from 'react-native-paper'
import { Module } from 'wollok-ts/dist/model'
import { HomeScreenNavigationProp } from '../../../pages/Home'
import { Theme } from '../../../theme'
import { EntityKindIcon } from '../EntityKindIcon'
import { stylesheet } from './styles'

type Props = {
	entity: Module
	theme: Theme
}

function EntityComponent(props: Props) {
	const styles = stylesheet(props.theme)
	const navigation = useNavigation<HomeScreenNavigationProp>()
	const goToEntityDetails = () => {
		navigation.navigate('EntityStack', {
			entityFQN: props.entity.fullyQualifiedName(),
		})
	}

	return (
		<List.Item
			onPress={goToEntityDetails}
			key={props.entity.name}
			style={styles.item}
			titleStyle={styles.itemTitle}
			title={props.entity.name}
			left={() => <EntityKindIcon kind={props.entity.kind} />}
		/>
	)
}

export default withTheme(EntityComponent)
