import { FlatList, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { ICollection } from "../../domain/models/collection-model";
import LigthNovelItem from "../ligthNovelItem/LigthNovelItem";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_COLLECTION_PAGINATED } from "../../api/graphql/gql/collection.gql";
import { IQueryResult } from "../../domain/models/response/queryResult.response";
import { useEffect, useState } from "react";

function LigthNovelList() {
  const limitCollectionToLoad = 6;
  const [homeCollections, setHomeCollections] = useState<ICollection[]>( [] as ICollection[] );
  const [countCollectionAdded, setCountCollectionAdded] = useState(1);

  const [getCollections, { data, loading, error }] = useLazyQuery< IQueryResult<ICollection[]>, any >(GET_COLLECTION_PAGINATED);
  const [loadMoreCollections] = useLazyQuery<IQueryResult<ICollection[]>, any>( GET_COLLECTION_PAGINATED );

  console.log(new Date().toLocaleDateString() === '08/14/22');
  console.log("\ntest");

  console.log(!!"");


  useEffect(() => {


    getCollections(paginated(0, limitCollectionToLoad));
    if (!loading && !error) {
      const { getCollectionsPaginated } = data || {};
      setHomeCollections(getCollectionsPaginated);
    }
  }, [data]);

  // TODO: CREAR SPINNER
  if (loading) return <Text>Loading...</Text>;
  if (error)
    return <Text style={{ marginTop: 100 }}>Error!, {error.message}</Text>;

  const addMoreCollections = async () => {
    // console.log(countCollectionAdded);
    ToastAndroid.show("FINAL DE SCROLL", 1000);
    const {
      data = {},
      loading,
      error,
    } = await loadMoreCollections(
      paginated(
        countCollectionAdded * limitCollectionToLoad,
        limitCollectionToLoad
      )
    );

    if (!loading && !error) {
      const { getCollectionsPaginated } = data;
      if (getCollectionsPaginated.length > 0) {
        setHomeCollections((homeCollectionCurrent) => [
          ...homeCollectionCurrent,
          ...getCollectionsPaginated,
        ]);
        setCountCollectionAdded((currentCount) => currentCount + 1);
        console.log("addMoreCollections:");
        console.log(data.getCollectionsPaginated.length);
      }
    }
  };

  return (
    <View style={styles.ln_container}>
      <FlatList<ICollection>
        data={homeCollections}
        onEndReached={addMoreCollections}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={true}
        numColumns={2}
        columnWrapperStyle={styles.ln_columns}
        renderItem={({ item, index }) => (
          <LigthNovelItem key={index} {...item} />
        )}
        // onMomentumScrollEnd={()=>ToastAndroid.show("FInal!",1000)}
      />
    </View>
  );
}

const paginated = (offset: number, limit: number) => {
  return {
    variables: {
      input: {
        offset,
        limit,
      },
    },
  };
};

const styles = StyleSheet.create({
  ln_container: {
    marginTop: 15,
    // backgroundColor: "#444"
  },
  ln_columns: {
    justifyContent: "space-evenly", //Los lados no tiene tamaño de margen ya que tablet se veria afectado
    marginBottom: 15,
  },
});

export default LigthNovelList;
