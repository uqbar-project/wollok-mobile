import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

export function stylesheet(theme: Theme){
    return StyleSheet.create({
        fab: {
            position: 'absolute',
            margin: 30,
            right: 0,
            bottom: 0,
            backgroundColor: theme.colors.primary
        }
    })
}