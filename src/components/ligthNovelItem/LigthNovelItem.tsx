import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LigthNovel } from "../../domain/models/ligthNovel";
import { Dimensions } from "react-native";
import { ToastAndroid } from "react-native";

const screen = Dimensions.get("screen");

function LigthNovelItem(props: LigthNovel) {
  const [showImage, setShowImage] = useState({
    showDefault: true,
    error: false
  });

  const image = showImage.error
    ? require("../../assets/not_found.jpg")
    : { uri: props.image };

  return (
    <View
      onTouchEnd={() => {
        onTouchEndBookImage(props.titles[0]);
      }}
    >
      <View style={styles.lnList_book}>
        <Image
          style={styles.lnList_book__image}
          source={image}
          onError={() => setShowImage({ showDefault: true, error: true })}
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

const imageWith = screen.width / 2.2;

const styles = StyleSheet.create({
  // lnList_container: {},
  lnList_title: {
    width: imageWith,
    // backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    borderRadius: 25,
  },
  lnList_title__text: {
    textAlign: "center",
    flexWrap: "wrap",
    fontWeight:"bold"
    // color: "#fff",
  },
  lnList_book: {
    backgroundColor: "#eee",
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 10
  },
  lnList_book__image: {
    // aspectRatio:1.5,
    width: imageWith,
    height: screen.width / 1.8,
    resizeMode: "contain"
  }
});

export default LigthNovelItem;
