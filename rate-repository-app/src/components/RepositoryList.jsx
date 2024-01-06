import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, navigate }) => {
  const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
    : [];
  
  const onPress = (id) => {
    navigate(`/repositories/${id}`)
  }
  
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <Pressable onPress={() => onPress(item.id) }><RepositoryItem item={item} /></Pressable>}
    />)
}

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const navigate = useNavigate()
  return <RepositoryListContainer repositories={repositories} navigate={navigate}/>
};

export default RepositoryList;
