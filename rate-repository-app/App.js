import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";
import { NativeRouter } from "react-router-native";
import Constants from "expo-constants";

import Main from "./src/components/Main";

const apolloClient = createApolloClient();

const App = () => {
  console.log(Constants.manifest.extra);
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
