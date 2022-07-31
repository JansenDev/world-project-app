import { useQuery } from "@apollo/client";
import { GET_COLLECTION_DETAIL_BY_ID } from "../api/graphql/gql/collection.gql";
import { ICollectionDetail } from "../domain/models/collectionDetail.model";
// const notFoundImage = require("../assets/not_found.jpg");

function useRepositoryBook(idCollection: string) {
  const {
    data = {},
    loading,
    error
  } = useQuery(GET_COLLECTION_DETAIL_BY_ID, {
    variables: {
      idCollection
    }
  });

  const { getCollectionDetailedById = null } = data;

  if (!loading)
    return {
      book: getCollectionDetailedById as ICollectionDetail,
      bookImage: { uri: getCollectionDetailedById.image },
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
