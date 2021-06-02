import { StyleSheet, View } from "react-native"
import { useTheme, Theme } from "@react-navigation/native"
import { FAB } from "react-native-paper"
import React from 'react'

export function FabAddScreen(props: {children: Element | Element[], onPress?: () => void}){
    const theme = useTheme()
    const styles = getStyles(theme)
    return (
        <View style={styles.screen}>
            {props.children}
            <FAB icon="plus" onPress={props.onPress} style={ styles.fab } />
        </View>
    )
}

const getStyles = (theme: Theme) => StyleSheet.create({
    screen: {
        flex: 1  
    },
    fab: {
        position: 'absolute',
        margin: 30,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.primary
    }
})
  