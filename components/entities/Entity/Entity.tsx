import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { List, withTheme } from 'react-native-paper'
import { Entity } from '../../../models/entity'
import { EntitiesScreenNavigationProp } from '../../../pages/Entities/Entities'
import { Theme } from '../../../theme'
import { EntityKindIcon } from '../EntityKindIcon'
import { stylesheet } from './styles'

type Props = {
	entity: Entity
	theme: Theme
}

function EntityComponent(props: Props) {
	const styles = stylesheet(props.theme)
	const navigation = useNavigation<EntitiesScreenNavigationProp>()
	const goToEntityDetails = () => {
		navigation.navigate('EntityDetails', { entity: props.entity })
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
