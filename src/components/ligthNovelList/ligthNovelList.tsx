import { FlatList, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { ICollection } from "../../domain/models/collection-model";
import LigthNovelItem from "../ligthNovelItem/LigthNovelItem";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_COLLECTION_PAGINATED } from "../../api/graphql/gql/collection.gql";
import { IQueryResult } from "../../domain/models/response/queryResult.response";
import { useEffect, useState } from "react";
import {
  cleanLocalStorage,
  addCollection,
  getColletion,
  getLocalStorage,
} from "../../utils/localstorage";

function LigthNovelList() {
  const limitCollectionToLoad = 6;
  const [homeCollections, setHomeCollections] = useState<ICollection[]>(
    [] as ICollection[]
  );
  const [countCollectionAdded, setCountCollectionAdded] = useState(1);

  const [getCollections, { data, loading, error }] = useLazyQuery<
    IQueryResult<ICollection[]>,
    any
  >(GET_COLLECTION_PAGINATED);
  const [loadMoreCollections] = useLazyQuery<IQueryResult<ICollection[]>, any>(
    GET_COLLECTION_PAGINATED
  );

  // console.log(new Date().toLocaleDateString() === "08/14/22");

  // const loadLocalStorage = async () => {
  //   // cleanLocalStorage();

  //   const hasDataLocalStorage = !!(await getColletion());
  //   if (hasDataLocalStorage) {
  //     const getCollectionsPaginatedCache = await getColletion();
  //     console.log("Si existe caché");
  //     setHomeCollections(getCollectionsPaginatedCache!);
  //   } else {
  //     console.log("No hay cache prro");
  //     getCollections(paginated(0, limitCollectionToLoad));
  //     if (!loading && !error) {
  //       const { getCollectionsPaginated } = data || {};
  //       setHomeCollections(getCollectionsPaginated);
  //       addCollection(getCollectionsPaginated);
  //     }
  //   }
  // };

  useEffect(() => {
    // TODO: agregar guardado en caché
    // loadLocalStorage();

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

  // Cargar mas collectiones(NL)
  const addMoreCollections = async () => {
    // ToastAndroid.show("FINAL DE SCROLL", 1000);
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
        // addCollection([...homeCollections, ...getCollectionsPaginated]);
        console.log(
          "addMoreCollections: ",
          data.getCollectionsPaginated.length
        );
        console.log("paginated: ", countCollectionAdded);
      }
    }
  };

  return (
    <View style={styles.ln_container}>
      <FlatList<ICollection>
        data={homeCollections}
        // keyExtractor={(item) => item.collection_id}
        onEndReached={addMoreCollections}
        onEndReachedThreshold={0.3}
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
