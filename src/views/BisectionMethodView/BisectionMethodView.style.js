import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 10
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 30,
        textAlign: "center",
    },
    inputContainer: {
        justifyContent: "center",
        width: "100%",
        height: 80,
    },
    input: {
        width: "100%",
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#FFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    mathInput: {
        height: 50,
    },
    calculateButton: {
        width: 150,
        alignSelf: "center",
        marginBottom: 25
    }
});