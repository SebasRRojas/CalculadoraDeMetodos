import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
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
    button: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
        margin: 3,
    },
    text: {
        fontSize: 15,
        textAlign: "center"
    }
})