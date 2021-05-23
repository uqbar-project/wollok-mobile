import React from 'react'
import { useTheme } from "@react-navigation/native";
import { Image, StyleProp, ViewStyle } from 'react-native';
import { List } from 'react-native-paper';
import { Module, Kind } from 'wollok-ts/dist/model';
import { KindIcon } from '../EntityKindIcon';


export function EntityComponent(props: { entity: Module }) {
    const { colors } = useTheme()

    const itemStyle: StyleProp<ViewStyle> = {
        marginHorizontal: 10,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        borderColor: colors.primary,
        borderWidth: 1,
        backgroundColor: colors.notification,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
    return (
        <List.Item
            key={props.entity.name}
            style={itemStyle}
            titleStyle={{ fontSize: 20 }}
            title={props.entity.name}
            left={() => <KindIcon kind={props.entity.kind} />}
        />
    )
}