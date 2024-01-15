import { StyleSheet } from "react-native";
import theme from "./theme";

export const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
});
