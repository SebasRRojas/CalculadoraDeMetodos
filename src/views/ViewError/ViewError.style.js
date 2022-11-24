import { StyleSheet, Platform } from "react-native";

export const stylesError = StyleSheet.create({
    container: {
      flex: 1,
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    }, 
    image: {
        flex: 1,
        justifyContent: "center"
    }
  });