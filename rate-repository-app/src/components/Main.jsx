import SingleRepoView from "./SingleRepoView";
import RepositoryList from "./RepositoryList";
import ReviewForm from "./ReviewForm";
import SignIn from "./SignIn";
import AppBar from "./AppBar";
import theme from "../theme";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import SignUpForm from "./SignUpForm";
import UserReviews from "./UserReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/repositories/:id" element={<SingleRepoView />} />
        <Route path="/create_review" element={<ReviewForm />} />
        <Route path="/my_reviews" element={<UserReviews />} />
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
