import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ToastAndroid
} from "react-native";
import { useNavigate, useParams } from "react-router-native";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import TextStyled from "../../components/text/TextStyle";
import MIIcon from "react-native-vector-icons/MaterialIcons";
import Footer from "../../components/footer/Footer";
import useRepositoryBook from "../../hooks/useRepositoryBook";

const screen = Dimensions.get("screen");
const isTable = screen.width > 500;
const MARCO_DE_LIBRO_COLOR = "#eee";

// TODO: Los volumenes deberian ser una array con los titulos

function DetailsBook() {
  const { book_id } = useParams();
  const { book, bookImage, loading, error } = useRepositoryBook(book_id!);

  if (loading)
    return <TextStyled style={styles.detailt_container}>Loading...</TextStyled>;
  if (error) return null;

  return (
    <>
      <ScrollView style={styles.detailt_container}>
        {book && (
          <View style={{ marginHorizontal: 15 }}>
            <View style={styles.detailt_row1}>
              <View style={styles.detail_wrap}>
                <Image
                  style={styles.detailt_image}
                  source={bookImage}
                  resizeMode="contain"
                />
              </View>

              <View
                style={{
                  padding: 15,
                  width: widthRow1Details
                }}
              >
                <TextStyled
                  numberOfLines={2}
                  type="h1"
                  style={styles.detail_title}
                >
                  {book.name}
                </TextStyled>

                <TextStyled>
                  <TextStyled fontWeight="700">Generos:</TextStyled>
                  {book.genders &&
                    " " + book.genders.toString().replace(",", ", ")}
                </TextStyled>
                <TextStyled numberOfLines={1}>
                  <TextStyled fontWeight="700">Autor: </TextStyled>
                  {book.author}
                </TextStyled>
                <TextStyled>
                  <TextStyled fontWeight="700">Volumenes: </TextStyled>
                  {book.volumes}
                </TextStyled>
                {book.last_post != "" && (
                  <TextStyled>
                    <TextStyled fontWeight="700">Estado: </TextStyled>
                    {book.last_post}
                  </TextStyled>
                )}
              </View>
            </View>

            {book.synopsis && (
              <View style={styles.detailt_row2}>
                <TextStyled style={styles.detail_synopsis} type="h2">
                  {book.synopsis}
                </TextStyled>
              </View>
            )}

            <View style={styles.detailt_row3}>
              <View style={styles.row3_title}>
                <TextStyled style={styles.row3_title_text} type="h1">
                  Volumenes
                </TextStyled>
              </View>
              <View style={styles.row3_volumenesList}>
                {book.volumes &&
                  [...Array(Number(book.volumes)).keys()].map((volume, i) => (
                    <VolumenItem
                      key={i}
                      bookId={book.collection_id.toString()}
                      volume={volume.toString()}
                    />
                  ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      <Footer />
    </>
  );
}

const VolumenItem = ({
  bookId,
  volume,
  page = "1"
}: {
  bookId: string;
  volume: string;
  page?: string;
}) => {
  const navegate = useNavigate();
  return (
    <View
      onTouchEnd={() => {
        const volumeSelected = (Number(volume) + 1).toString();
        ToastAndroid.show("Volumen " + volumeSelected, 1000);
        navegate(`/reader/${bookId}/${volumeSelected}/${page}`);
      }}
      style={styles.row3_volumenesList_item}
    >
      <View style={{ backgroundColor: "white" }}>
        <TextStyled type="h2">Volumen: {Number(volume) + 1}</TextStyled>
      </View>
      <View></View>
      <MIIcon style={styles.volumenList_item_icon} name="read-more"></MIIcon>
    </View>
  );
};

const widthImage = screen.width / 3;
const heigthImage = screen.width / 2.1;
const paddingWrapImage = 15;
const widthRow1Details =
  screen.width - (widthImage + paddingWrapImage * 2) - 30;

const styles = StyleSheet.create({
  detailt_container: {
    marginTop: Constants.statusBarHeight,
    // backgroundColor: "yellow",
    flex: 1
  },
  detailt_row1: {
    // backgroundColor: "cyan",
    flexDirection: "row",
    marginTop: 25
  },
  detailt_image: {
    width: widthImage,
    height: heigthImage,
    backgroundColor: MARCO_DE_LIBRO_COLOR
  },
  detail_wrap: {
    padding: paddingWrapImage,
    backgroundColor: MARCO_DE_LIBRO_COLOR,
    borderRadius: 10
  },
  detail_title: {
    // backgroundColor: "green",
    fontWeight: "bold",
    flexWrap: "wrap",
    marginBottom: 10
  },
  detailt_row2: {
    // padding: 10
    // backgroundColor: "green",
    // height: 75
    marginTop: 10
  },
  detail_synopsis: {
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "black",
    opacity: 0.6,
    padding: 10,
    borderRadius: 5
  },
  detailt_row3: {
    // backgroundColor: "red",
    marginTop: 15,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 1,
    marginBottom: 15
  },
  row3_title: {
    backgroundColor: "cyan",
    height: isTable ? 50 : 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  row3_title_text: {},
  row3_volumenesList: {
    // paddingTop: 10
  },
  row3_volumenesList_item: {
    padding: 10,
    // backgroundColor: "green",
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderTopWidth: isTable ? 0 : 1,
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative"
  },
  volumenList_item_icon: {
    position: "absolute",
    fontSize: 25,
    // backgroundColor: "white",
    // alignItems:"center",
    top: "50%",
    right: 15
  }
});

export default DetailsBook;
