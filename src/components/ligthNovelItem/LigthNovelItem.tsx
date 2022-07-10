import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LigthNovel } from "../../domain/models/ligthNovel";
import { Dimensions } from "react-native";
import { ToastAndroid } from "react-native";

const screen = Dimensions.get("screen");

function LigthNovelItem(props: LigthNovel) {
  return (
    <View
      onTouchEnd={() => {
        onTouchEndBookImage(props.titles[0]);
      }}
    >
      <View style={styles.lnList_book}>
        <Image
          style={styles.lnList_book__image}
          source={{ uri: props.image }}
        />
      </View>
      <View style={styles.lnList_title}>
        <Text style={styles.lnList_title__text}>{props.titles[0]}</Text>
      </View>
    </View>
  );
}
const onTouchEndBookImage = (title: string) => {
  ToastAndroid.show(title, 2500);
  console.log("Title: " + title);
};

const styles = StyleSheet.create({
  // lnList_container: {},
  lnList_title: {
    width: screen.width / 2.2,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    borderRadius: 25
  },
  lnList_title__text: {
    textAlign: "center",
    flexWrap: "wrap"
  },
  lnList_book: {
    width: screen.width / 2.2,
    backgroundColor: "#eee",
    alignItems: "center",
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 5
  },
  lnList_book__image: {
    // aspectRatio:1.5,
    width: screen.width / 2.2,
    height: screen.width / 1.8,
    resizeMode: "contain"
  }
});

export default LigthNovelItem;
