import Text from "./Text";
import useSignIn from "../hooks/useSignIn";
import { Pressable } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import theme from "../theme";
import Constants from "expo-constants";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

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

  const navigate = useNavigate()
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate("/")
    } catch (e) {
      console.log(e);
    }
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
