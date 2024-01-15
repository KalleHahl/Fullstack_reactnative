import RepositoryItem from "./RepositoryItem";
import useSingleRepo from "../hooks/useSingleRepo";
import Text from "./Text";

import { useParams } from "react-router-native";
import { FlatList, View } from "react-native";
import { styles } from "../styles";

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} link={true} />;
};

export const ReviewItem = ({ review }) => {
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
