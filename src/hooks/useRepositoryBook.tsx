import { useQuery } from "@apollo/client";
import { GET_COLLECTION_DETAIL_BY_ID } from "../api/graphql/gql/collection.gql";
import { ICollectionDetail } from "../domain/models/collectionDetail.model";
import { IQueryResult } from "../domain/models/response/queryResult.response";

function useRepositoryBook(idCollection: string) {
  const { data, loading, error } = useQuery<
    IQueryResult<ICollectionDetail>,
    { idCollection: string }
  >(GET_COLLECTION_DETAIL_BY_ID, {
    variables: {
      idCollection
    }
  });

  const { getCollectionDetailedById = null } = data || {};

  if (!loading)
    return {
      book: getCollectionDetailedById,
      bookImage: { uri: getCollectionDetailedById!.image },
      loading,
      error
    };

  return {
    book: {} as ICollectionDetail,
    bookImage: require("../assets/not_found.jpg"),
    loading,
    error
  };
}

export default useRepositoryBook;
