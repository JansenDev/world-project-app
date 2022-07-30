import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Footer from "../../components/footer/Footer";
import Constants from "expo-constants";
import TextStyled from "../../components/text/TextStyle";
import useRepositoryVolume from "../../hooks/useRepositoryVolume";

const { width: widthScreen, height: heightScreen } = Dimensions.get("screen");
const isTable = widthScreen > 500;

function Reader() {
  const { volumeFound } = useRepositoryVolume();

  return (
    <>
      <ScrollView style={{ marginTop: Constants.statusBarHeight }}>
        <View style={styles.reader_container}>
          {volumeFound && (
            <>
              {/* <TextStyled>volumeId: {volumeFound.volumeId}</TextStyled>
              <TextStyled>pagesCurrent: {volumeFound.pagesCurrent}</TextStyled>
              <TextStyled>pagesTotal: {volumeFound.pagesTotal}</TextStyled>
              <TextStyled>volume: {volumeFound.volume}</TextStyled>
              <TextStyled>
                Progreso:
                {" " +
                  (volumeFound.pagesCurrent * 100) / volumeFound.pagesTotal}
                %
              </TextStyled> */}
              {volumeFound.pages.map((page, index) => (
                <View key={index} style={styles.reader_pages}>
                  {page.image !== "" && (
                    <Image
                      style={styles.pages_image}
                      source={{ uri: page.image }}
                      resizeMode="stretch"
                    />
                  )}

                  {page.index && (
                    <>
                      <TextStyled
                        style={{ textAlign: "center" }}
                        type="h1"
                        fontWeight="bold"
                      >
                        Indice
                      </TextStyled>
                      <TextStyled style={styles.reader_pageNumber}>
                        Page: {page.pageNumber}
                      </TextStyled>
                    </>
                  )}

                  {/* !texto */}
                  {page.title.title && (
                    <TextStyled style={styles.pages_title}>
                      {page.title.tag}: {page.title.title}
                    </TextStyled>
                  )}
                  {page.text !== "" && (
                    <>
                      <TextStyled type="h2">{page.text.trim()}</TextStyled>
                      <TextStyled style={styles.reader_pageNumber}>
                        Page: {page.pageNumber}
                      </TextStyled>
                    </>
                  )}
                </View>
              ))}
            </>
          )}
          {!volumeFound && <Text>Aun no se carga Novela</Text>}
        </View>
      </ScrollView>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  reader_container: {
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: "cyan"
    // paddingHorizontal: 15
  },
  reader_pages: {
    backgroundColor: "yellow"
  },
  pages_image: {
    height: isTable ? heightScreen : widthScreen / 0.65,
    width: widthScreen,
    backgroundColor: "black"
  },
  pages_title: {
    fontSize: isTable ? 40 : 25,
    textAlign: "center",
    // backgroundColor: "green",
    marginBottom: isTable ? 20 : 20,
    marginTop: isTable ? 40 : 30
  },
  reader_pageNumber: {
    textAlign: "right",
    opacity:.6
  }
});

export default Reader;
