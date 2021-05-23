import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

export function stylesheet(theme: Theme) {
    return StyleSheet.create({
        modal: {
            padding: 20, 
            backgroundColor: theme.colors.background 
        }
    })
}