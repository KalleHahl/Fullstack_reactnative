import Text from "./Text";
import { Pressable } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import theme from "../theme";
import Constants from "expo-constants";
import * as yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("password is required"),
});

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <View style={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" />

            <Pressable onPress={handleSubmit}>
              <Text style={styles.signInButton}>Sign in</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
