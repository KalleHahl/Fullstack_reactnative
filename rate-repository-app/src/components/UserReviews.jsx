import { useQuery, useMutation } from "@apollo/client";
import { FlatList, View, Text, Pressable, Alert } from "react-native";
import * as Linking from "expo-linking";

import { ME } from "../graphql/queries";
import { ReviewItem } from "./SingleRepoView";
import { styles } from "../styles";
import { DELETE_REVIEW } from "../graphql/mutations";

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviewsContainer = ({ reviewNodes, handleDelete, refetch }) => {
  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} />
          <View style={styles.container}>
            <Pressable
              style={styles.container}
              onPress={() => {
                Linking.openURL(item.repository.url);
                refetch();
              }}
            >
              <Text style={styles.openRepoButton} fontWeight="bold">
                View repository
              </Text>
            </Pressable>
            <Pressable
              style={styles.container}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteRepoButton}>Delete review</Text>
            </Pressable>
          </View>
        </View>
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const UserReviews = () => {
  const { data, error, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
  });
  const [deleteMutation] = useMutation(DELETE_REVIEW);

  if (loading) return <Text>Loading...</Text>;
  if (error) {
    Alert.alert("Error", "An error occured...");
    return null;
  }

  const handleDelete = async (id) => {
    console.log(id);
    Alert.alert("Delete confirmation", "Delete this review?", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          await deleteMutation({
            variables: { deleteReviewId: id },
          });
          await refetch();
        },
        style: "destructive",
      },
    ]);
  };
  const reviewNodes = data
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];
  return (
    <UserReviewsContainer
      reviewNodes={reviewNodes}
      handleDelete={handleDelete}
      refetch={refetch}
    />
  );
};

export default UserReviews;
