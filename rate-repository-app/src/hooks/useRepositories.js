import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (values) => {
  const { order, orderDirection } = values;
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy: order, orderDirection: orderDirection },
    fetchPolicy: "cache-and-network",
  });
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return { repositories: data.repositories };
};

export default useRepositories;
