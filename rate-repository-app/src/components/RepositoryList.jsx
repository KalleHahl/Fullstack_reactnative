import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useState, Component } from "react";
import { useDebounce } from "use-debounce";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import TextInput from "./TextInput";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerStyle: {
    fontSize: 15,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValue: "latest repositories",
    };
  }

  onPress = (id) => {
    this.props.navigate(`/repositories/${id}`);
  };

  handlePickerChange = (itemValue) => {
    switch (itemValue) {
      case "latest repositories":
        this.setState({
          pickerValue: "latest repositories",
        });
        this.props.setOrderBy("CREATED_AT");
        this.props.setOrderDirection("DESC");
        break;
      case "highest rating":
        this.setState({
          pickerValue: "highest rating",
        });
        this.props.setOrderBy("RATING_AVERAGE");
        this.props.setOrderDirection("DESC");
        break;
      case "lowest rating":
        this.setState({
          pickerValue: "lowest rating",
        });
        this.props.setOrderBy("RATING_AVERAGE");
        this.props.setOrderDirection("ASC");
        break;
      default:
        this.setState({
          pickerValue: "latest repositories",
        });
        this.props.setOrderBy("CREATED_AT");
        this.props.setOrderDirection("DESC");
    }
  };

  renderHeader = () => {
    const { filterBy, setFilterBy } = this.props;

    return (
      <>
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.pickerValue}
          onValueChange={this.handlePickerChange}
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

        <TextInput
          style={styles.input}
          value={filterBy}
          onChangeText={(value) => setFilterBy(value)}
          placeholder="Filter by..."
        />
      </>
    );
  };

  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <View>
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={this.renderHeader}
          renderItem={({ item }) => (
            <Pressable onPress={() => this.onPress(item.id)}>
              <RepositoryItem item={item} />
            </Pressable>
          )}
        />
      </View>
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [filterBy, setFilterBy] = useState("");
  const [filter] = useDebounce(filterBy, 500);
  const { repositories } = useRepositories({
    order: orderBy,
    orderDirection,
    filter,
  });
  const navigate = useNavigate();
  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
    />
  );
};

export default RepositoryList;
