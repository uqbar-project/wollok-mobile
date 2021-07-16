import React from 'react'
import { useTheme, useNavigation } from "@react-navigation/native";
import { List } from 'react-native-paper';
import { EntityKindIcon } from '../EntityKindIcon';
import { stylesheet } from './styles'
import { EntitiesScreenNavigationProp } from '../../../pages/Entities/Entities';
import { Entity } from '../../../models/entity';

type Props =  { 
    entity: Entity,
}

export function EntityComponent(props: Props) {
    const styles = stylesheet(useTheme())
    const navigation = useNavigation<EntitiesScreenNavigationProp>()
    const goToEntityDetails = () => {
        navigation.navigate('EntityDetails', {entity: props.entity})
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