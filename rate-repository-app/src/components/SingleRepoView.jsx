import RepositoryItem from "./RepositoryItem";
import useSingleRepo from "../hooks/useSingleRepo";
import { useParams } from "react-router-native";

const SingleRepoView = () => {
    const { id } = useParams()
    const data = useSingleRepo(id)
    return <RepositoryItem item={data} link={true} />
}

export default SingleRepoView