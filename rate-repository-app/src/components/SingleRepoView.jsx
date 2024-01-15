import RepositoryItem from "./RepositoryItem";
import useSingleRepo from "../hooks/useSingleRepo";
import theme from "../theme";
import Text from "./Text";

import { useParams } from "react-router-native";
import { FlatList, View, StyleSheet } from "react-native";
// import { format } from "date-fns";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: theme.colors.white,
    padding: 10,
    flexDirection: "row",
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: 5,
    paddingRight: 5,
    flex: 8,
  },
  ratingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 5,
  },
  ratingBox: {
    width: 40,
    height: 40,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} link={true} />;
};

const ReviewItem = ({ review }) => {
  const created = new Date(review.createdAt);
  const formattedCreated = created.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }); //format(created, "dd.MM.yyyy");
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingBox}>
          <Text fontSize="subheading" fontWeight="bold" color="primary">
            {review.rating}
          </Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text fontSize="subheading" fontWeight="bold">
          {review.user.username}
        </Text>
        <Text>{formattedCreated}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepoView = () => {
  const { id } = useParams();
  const repo = useSingleRepo(id);
  if (!repo.reviews) return <Text>Loading...</Text>;

  const reviewNodes = repo ? repo.reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <View>
          <RepositoryInfo repository={repo} />
          <ItemSeparator />
        </View>
      )}
    />
  );
};

export default SingleRepoView;
