import React from 'react'
import { useTheme } from "@react-navigation/native";
import { Container, Item, ListItem, Text, View } from "native-base";

export function Definition(props: {name: string}) {
    const {colors} = useTheme()
    return (
        <View style={{
            marginHorizontal: 5,
            padding: 10,
            marginTop: 6,
            backgroundColor: colors.notification,
            borderRadius: 20
        }}>
            <Text>{props.name}</Text>
        </View>
    )
}