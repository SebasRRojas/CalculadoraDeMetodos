import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e9e9e9",
        padding: 10
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 20,
    },
    numericButtonsContainer:{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignSelf: "center",
        width: 250,
    },
    mathButtonsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 10
    },
    mathInput:{
        height: 100,
    },
    mathInputContainer: {
        
    }
});