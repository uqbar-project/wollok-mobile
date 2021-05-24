import React from 'react'
import { useTheme } from "@react-navigation/native";
import { List } from 'react-native-paper';
import { Module } from 'wollok-ts/dist/model';
import { EntityKindIcon } from '../EntityKindIcon';
import { stylesheet } from './styles'

export function EntityComponent(props: { entity: Module }) {
    const styles = stylesheet(useTheme())

    return (
        <List.Item
            key={props.entity.name}
            style={styles.item}
            titleStyle={styles.itemTitle}
            title={props.entity.name}
            left={() => <EntityKindIcon kind={props.entity.kind} />}
        />
    )
}