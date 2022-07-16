import { FlatList, StyleSheet, ToastAndroid, View } from "react-native";
import { LigthNovel } from "../../domain/models/ligthNovel";
import LigthNovelItem from "../ligthNovelItem/LigthNovelItem";
import data from "../../utils/collections";

function LigthNovelList() {
  console.log("Books Total: ", data.length);

  return (
    <View style={styles.ln_container}>
      <FlatList<LigthNovel>
        data={data}
        showsVerticalScrollIndicator={true}
        numColumns={2}
        columnWrapperStyle={styles.ln_columns}
        renderItem={({ item, index }) => (
          <LigthNovelItem key={index} {...item} />
        )}
        onMomentumScrollEnd={()=>ToastAndroid.show("FInal!",1000)}
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
    justifyContent: "space-evenly",
    marginBottom: 15
  }
});

export default LigthNovelList;
