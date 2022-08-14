import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { GET_PAGES_BY_ID_COLLECTION_AND_VOLUME_NUMBER } from "../api/graphql/gql/collection.gql";
import { IQueryResult } from "../domain/models/response/queryResult.response";
import {
  IPageContent
} from "../domain/models/volumeLigthNovel";

function useRepositoryVolume() {
  const { book_id = "", book_volume = "", book_pageNumber = "1" } = useParams();
  const {
    data = {},
    loading,
    error
  } = useQuery<IQueryResult<IPageContent[]>, any>(
    GET_PAGES_BY_ID_COLLECTION_AND_VOLUME_NUMBER,
    {
      variables: {
        input: {
          volume_number: Number(book_volume),
          id_collection: book_id,
          offset: null,
          limit: null
        }
      }
    }
  );

  if (!loading) return { data, loading, error };

  return {
    data: {},
    loading,
    error
  };
}

export default useRepositoryVolume;
