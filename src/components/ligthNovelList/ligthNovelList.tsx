import { FlatList, StyleSheet, Text, View } from "react-native";
import { ICollection } from "../../domain/models/collection-model";
import LigthNovelItem from "../ligthNovelItem/LigthNovelItem";
import { useQuery } from "@apollo/client";
import { GET_COLLECTION_PAGINATED } from "../../api/graphql/gql/collection.gql";
import { IQueryResult } from "../../domain/models/response/queryResult.response";

function LigthNovelList() {
  const { data, loading, error } = useQuery<IQueryResult<ICollection[]>, any>(
    GET_COLLECTION_PAGINATED,
    {
      variables: {
        input: {
          offset: null,
          limit: null
        }
      }
    }
  );

  // TODO: CREAR SPINNER
  if (loading) return <Text>Loading...</Text>;

  if (error)
    return <Text style={{ marginTop: 100 }}>Error!, {error.message}</Text>;

  return (
    <View style={styles.ln_container}>
      <FlatList<ICollection>
        data={data!.getCollectionsPaginated}
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

const styles = StyleSheet.create({
  ln_container: {
    marginTop: 15
    // backgroundColor: "#444"
  },
  ln_columns: {
    justifyContent: "space-evenly", //Los lados no tiene tamaño de margen ya que tablet se veria afectado
    marginBottom: 15,
  }
});

export default LigthNovelList;
