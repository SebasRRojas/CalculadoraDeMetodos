import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        position:"absolute",
        bottom: 20,
        left: 20,
        width: 55,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        margin: 3,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    text: {
        fontSize: 15,
        textAlign: "center"
    }
});