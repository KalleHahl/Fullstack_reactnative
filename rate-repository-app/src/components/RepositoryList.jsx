import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerStyle: {
    fontSize: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  navigate,
  setOrderBy,
  setOrderDirection,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const [pickerValue, setPickerValue] = useState("latest repositories");

  const onPress = (id) => {
    navigate(`/repositories/${id}`);
  };

  const handlePickerChange = (itemValue) => {
    switch (itemValue) {
      case "latest repositories":
        setPickerValue("latest repositories");
        setOrderBy("CREATED_AT");
        setOrderDirection("DESC");
        break;
      case "highest rating":
        setPickerValue("highest rating");
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("DESC");
        break;
      case "lowest rating":
        setPickerValue("lowest rating");
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("ASC");
        break;
      default:
        setPickerValue("latest repositories");
        setOrderBy("CREATED_AT");
        setOrderDirection("DESC");
    }
  };

  return (
    <View>
      <Picker
        style={styles.pickerStyle}
        selectedValue={pickerValue}
        onValueChange={handlePickerChange}
      >
        <Picker.Item
          style={styles.pickerStyle}
          label="Latest repositories"
          value="latest repositories"
        />
        <Picker.Item
          style={styles.pickerStyle}
          label="Highest rated repositories"
          value="highest rating"
        />
        <Picker.Item
          style={styles.pickerStyle}
          label="Lowest rated repositories"
          value="lowest rating"
        />
      </Picker>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => onPress(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [filterBy, setFilterBy] = useState("");
  const { repositories } = useRepositories({ order: orderBy, orderDirection });
  const navigate = useNavigate();
  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
    />
  );
};

export default RepositoryList;
