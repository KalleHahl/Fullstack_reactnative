import * as yup from "yup";
import { Formik } from "formik";
import { View, Pressable, Text } from "react-native";
import { useNavigate } from "react-router-native";

import FormikTextInput from "./FormikTextInput";
import useCreateReview from "../hooks/useCreateReview";
import { styles } from "../styles";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  reviewText: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name required"),
  repositoryName: yup.string().required("Repository name required"),
  rating: yup
    .number()
    .typeError("Rating must be a number between 0-100")
    .min(0, "Rating must be a number between 0-100")
    .max(100, "Rating must be a number between 0-100")
    .required("Rating is required"),
});
const ReviewFormContainter = ({ onSubmit }) => {
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
              name="ownerName"
              placeholder="Repository owner name"
            />
            <FormikTextInput
              name="repositoryName"
              placeholder="Repository name"
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
            />
            <FormikTextInput
              multiline={true}
              name="review"
              placeholder="Review"
            />
            <Pressable onPress={handleSubmit}>
              <Text style={styles.submitButton}>Create a Review</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};
const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;
    const ratingInt = parseInt(rating);
    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        ratingInt,
        review,
      });
      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewFormContainter onSubmit={onSubmit} />;
};

export default ReviewForm;
