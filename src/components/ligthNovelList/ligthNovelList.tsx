import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { LigthNovel } from "../../domain/models/ligthNovel";
import data from "../../utils/collections";
import LigthNovelItem from "../ligthNovelItem/LigthNovelItem";

function LigthNovelList() {
  console.log(data.length);

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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ln_container: {
    marginBottom: 74,
    marginTop: 15
  },
  ln_columns: {
    justifyContent: "space-evenly",
    marginBottom: 15
  }
});

export default LigthNovelList;
