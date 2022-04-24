import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { List, withTheme } from 'react-native-paper'
import { Module } from 'wollok-ts/dist/model'
import { HomeScreenNavigationProp } from '../../../pages/Home'
import { Theme } from '../../../theme'
import { ProblemReporterButton } from '../../problems/ProblemReporterButton'
import { EntityKindIcon } from '../EntityKindIcon'
import { stylesheet } from './styles'

type EntityComponentProps = {
	entity: Module
	theme: Theme
}

function EntityComponent({ entity, theme }: EntityComponentProps) {
	const styles = stylesheet(theme)
	const navigation = useNavigation<HomeScreenNavigationProp>()
	const goToEntityDetails = () => {
		navigation.navigate('EntityDetails', {
			entityFQN: entity.fullyQualifiedName(),
		})
	}

	return (
		<List.Item
			onPress={goToEntityDetails}
			key={entity.name}
			style={styles.item}
			titleStyle={styles.itemTitle}
			title={entity.name}
			left={() => <EntityKindIcon kind={entity.kind} />}
			right={() => <ProblemReporterButton node={entity} />}
		/>
	)
}

export default withTheme(EntityComponent)
