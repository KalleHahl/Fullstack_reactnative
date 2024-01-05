import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.white,
  },
  pictureContainer: {
    paddingLeft: 10,
    marginRight: 20,
  },
  flexContainerUpper: {
    display: "flex",
    flexDirection: "row",
  },
  flexContainerLower: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: Constants.statusBarHeight,
  },
  descriptionText: {
    flexGrow: 1,
  },
  statItem: {
    display: "flex",
    alignItems: "center",
  },
  infoContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  picture: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  languageBox: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    width: 100,
  },
});

const DescriptionBox = ({ name, description, language }) => {
  return (
    <View style={styles.infoContainer}>
      <Text fontSize="subheading" fontWeight="bold">
        {name}
      </Text>
      <Text style={styles.descriptionText}>{description}</Text>
      <Text style={styles.languageBox} fontWeight="bold">
        {language}
      </Text>
    </View>
  );
};

const StatsBox = ({ stats, type }) => {
  const rounded = stats >= 1000 ? (stats / 1000).toFixed(1) + "k" : stats;
  return (
    <View style={styles.statItem}>
      <Text fontWeight="bold">{rounded}</Text>
      <Text>{type}</Text>
    </View>
  );
};
const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.flexContainerUpper}>
        <View style={styles.pictureContainer}>
          <Image style={styles.picture} source={{ uri: item.ownerAvatarUrl }} />
        </View>
        <DescriptionBox
          name={item.fullName}
          description={item.description}
          language={item.language}
        />
      </View>
      <View style={styles.flexContainerLower}>
        <StatsBox stats={item.stargazersCount} type="Stars" />
        <StatsBox stats={item.forksCount} type="Forks" />
        <StatsBox stats={item.reviewCount} type="Reviews" />
        <StatsBox stats={item.ratingAverage} type="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;
