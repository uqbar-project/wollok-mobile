import React, { useState } from 'react'
import { List, withTheme } from 'react-native-paper'
import { Module } from 'wollok-ts/dist/model'
import {
	useNodeNavigation,
	withNodeNavigation,
} from '../../../context/NodeNavigation'
import { useProject } from '../../../context/ProjectProvider'
import { Theme } from '../../../theme'
import { wTranslate } from '../../../utils/translation-helpers'
import { ProblemReporterButton } from '../../problems/ProblemReporterButton'
import { OptionsDialog } from '../../ui/OptionsDialog'
import { EntityKindIcon } from '../EntityKindIcon'
import { stylesheet } from './styles'

type EntityComponentProps = {
	entity: Module
	theme: Theme
}

function EntityComponent({ entity, theme }: EntityComponentProps) {
	const styles = stylesheet(theme)
	const {
		actions: { deleteEntity },
	} = useProject()
	const [isOptionsVisible, setOptionsDialogVisible] = useState(false)
	const { goToNode } = useNodeNavigation()
	const goToEntityDetails = () => goToNode(entity)

	function onDelete() {
		deleteEntity(entity)
	}

	return (
		<>
			<List.Item
				onPress={goToEntityDetails}
				key={entity.name}
				style={styles.item}
				titleStyle={styles.itemTitle}
				title={entity.name}
				left={() => <EntityKindIcon kind={entity.kind} />}
				right={() => <ProblemReporterButton node={entity} />}
				onLongPress={() => setOptionsDialogVisible(true)}
			/>
			<OptionsDialog
				title={wTranslate('abm.options')}
				options={[{ action: onDelete, title: wTranslate('abm.delete') }]}
				visible={isOptionsVisible}
				dismiss={() => setOptionsDialogVisible(false)}
			/>
		</>
	)
}

export default withTheme(withNodeNavigation(EntityComponent))
