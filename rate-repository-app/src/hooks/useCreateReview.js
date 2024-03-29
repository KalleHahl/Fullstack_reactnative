import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({
    ownerName,
    repositoryName,
    ratingInt,
    review,
  }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName: ownerName,
          repositoryName: repositoryName,
          text: review,
          rating: ratingInt,
        },
      },
    });
    return data;
  };

  return [createReview, result];
};

export default useCreateReview;
