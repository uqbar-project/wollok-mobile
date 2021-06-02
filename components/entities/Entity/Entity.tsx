import React from 'react'
import { useTheme, useNavigation } from "@react-navigation/native";
import { List } from 'react-native-paper';
import { Module } from 'wollok-ts/dist/model';
import { EntityKindIcon } from '../EntityKindIcon';
import { stylesheet } from './styles'
import { EntitiesScreenNavigationProp } from '../../../pages/Entities/Entities';

type Props =  { 
    entity: Module,
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