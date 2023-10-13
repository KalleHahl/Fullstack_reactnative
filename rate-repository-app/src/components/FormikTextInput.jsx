import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";
import theme from "../theme";

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const styles = StyleSheet.create({
    errorText: {
      color: theme.colors.red,
      marginBottom: 10,
    },
    inputBox: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      borderColor: showError ? theme.colors.red : theme.colors.black,
      marginBottom: 10,
    },
  });
  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={styles.inputBox}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
