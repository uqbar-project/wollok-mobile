import React from 'react'
import { List, withTheme } from 'react-native-paper'
import { Module } from 'wollok-ts/dist/model'
import { useNodeNavigation } from '../../../context/NodeNavigation'
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
	const { goToNode } = useNodeNavigation()
	const goToEntityDetails = () => goToNode(entity)

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
