import * as yup from "yup";
import { Formik } from "formik";
import { View, Pressable, Text } from "react-native";
import { useNavigate } from "react-router-native";

import FormikTextInput from "./FormikTextInput";
import { styles } from "../styles";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be a string with a length between 5-30 characters")
    .max(30, "Username must be a string with a length between 5-30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be between 5-50 characters")
    .max(50, "Password must be between 5-50 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const SignUpFormContainer = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput
              name="username"
              placeholder="Username (5-30 characters)"
            />
            <FormikTextInput
              name="password"
              placeholder="Password (5-50 characters)"
            />
            <FormikTextInput
              name="passwordConfirmation"
              placeholder="Password confirmation"
            />
            <Pressable onPress={handleSubmit}>
              <Text style={styles.submitButton}>Sign up</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const data = await signUp({ username, password });
      console.log(data);
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
      Alert.alert(
        "Sign Un failed",
        "An unexpected error occured",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };
  return <SignUpFormContainer onSubmit={onSubmit} />;
};

export default SignUpForm;
