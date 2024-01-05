import { View, StyleSheet, ScrollView, Alert } from "react-native";
import Constants from "expo-constants";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-native";
import { Pressable } from "react-native";
import { useApolloClient } from "@apollo/client";

import theme from "../theme";
import Text from "./Text";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

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
  const { data, loading, error } = useQuery(ME)
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const handleLogOut = async (event) => {
    event.preventDefault()
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
  }

  if (loading) return null
  if (error) {
    Alert.alert('Error', "An error occured...")
    return null
  }
  
  return (
    <View style={styles.flexContainer}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.flexItem} fontWeight="bold" fontSize="subheading">
            Repositories
          </Text>
        </Link>
        {!data.me && <Link to="/signin">
          <Text style={styles.flexItem} fontWeight="bold" fontSize="subheading">
            Sign in
          </Text>
        </Link>}
        {data.me &&
          <Pressable onPress={handleLogOut}><Text style={styles.flexItem} fontWeight="bold" fontSize="subheading">
            Sign out
          </Text></Pressable>}
      </ScrollView>
    </View>
  );
};

export default AppBar;
