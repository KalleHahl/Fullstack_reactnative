import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useSingleRepo = (id) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return data.repository;
};

export default useSingleRepo;
