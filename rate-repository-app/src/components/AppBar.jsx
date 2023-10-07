import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import Text from "./Text";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarColor,
  },
  flexItem: {
    flexGrow: 1,
    color: theme.colors.white,
    paddingBottom: 10,
    paddingLeft: 10,
    textAlign: "center",
  },
});

const AppBar = () => {
  return (
    <View style={styles.flexContainer}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.flexItem} fontWeight="bold" fontSize="subheading">
            Repositories
          </Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.flexItem} fontWeight="bold" fontSize="subheading">
            Sign in
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
