import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LigthNovel } from "../../domain/models/ligthNovel";
import { Dimensions, ToastAndroid } from "react-native";
import { useNavigate } from "react-router-native";

const screen = Dimensions.get("screen");
const MARCO_DE_LIBRO_COLOR = "#eee";

function LigthNovelItem(props: LigthNovel) {
  const navegate = useNavigate();

  const [showImage, setShowImage] = useState({
    showDefault: true,
    error: false
  });

  const image = showImage.error
    ? require("../../assets/not_found.jpg")
    : { uri: props.image };

  const onTouchEndBookImage = (id: number) => {
    ToastAndroid.show(`${id}`, 2500);
    navegate(`/details/${id}`);
  };

  return (
    <View
      onTouchEnd={() => {
        onTouchEndBookImage(props.id);
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

const imageWith = screen.width / 2.2;

const styles = StyleSheet.create({
  // lnList_container: {},
  lnList_title: {
    width: imageWith,
    // backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    borderRadius: 25
  },
  lnList_title__text: {
    textAlign: "center",
    flexWrap: "wrap",
    fontWeight: "bold"
    // color: "#fff",
  },
  lnList_book: {
    backgroundColor: MARCO_DE_LIBRO_COLOR,
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
