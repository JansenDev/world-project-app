import React, { useEffect } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import Footer from "../../components/footer/Footer";
import Constants from "expo-constants";
import TextStyled from "../../components/text/TextStyle";
import useRepositoryVolume from "../../hooks/useRepositoryVolume";
import { useNavigate } from "react-router-native";

const { width: widthScreen, height: heightScreen } = Dimensions.get("screen");
const isTable = widthScreen > 500;

function Reader() {
  const { data = {}, error, loading } = useRepositoryVolume();



  const navegate = useNavigate();

  function handleBackButtonClick() {
    navegate(-1);
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);


  if (loading) {
    return (
      <TextStyled style={{ paddingTop: Constants.statusBarHeight }}>
        Loading...
      </TextStyled>
    );
  }
  if (error) return <TextStyled>Error:{error}</TextStyled>;
  const { getPagesByIdCollectionAndVolumeNumber: volumeFound = null } = data;

  return (
    <>
      <ScrollView style={{ marginTop: Constants.statusBarHeight }}>
        <View style={styles.reader_container}>
          {data && volumeFound && (
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

              {volumeFound.map((page, index) => (
                <View key={index} style={styles.reader_pages}>
                  {/* START IMAGE */}
                  {page.image !== "" && page.image && (
                    <Image
                      style={styles.pages_image}
                      source={{ uri: page.image }}
                      resizeMode="stretch"
                    />
                  )}
                  {/* END IMAGE */}

                  {/* START INDEX */}

                  {!page.image && !page.text && (
                    <>
                      <TextStyled
                        style={{ textAlign: "center" }}
                        type="h1"
                        fontWeight="bold"
                      >
                        Indice
                      </TextStyled>
                      <TextStyled style={styles.reader_pageNumber}>
                        Page: {page.page_number}
                      </TextStyled>
                    </>
                  )}
                  {/* END INDEX */}

                  {/* START TITLE */}
                  {page.title && (
                    <TextStyled style={styles.pages_title}>
                      {page.chapter_type}: {page.title}
                    </TextStyled>
                  )}
                  {/* END TITLE */}

                  {/* START TEXT */}
                  {page.text && page.text !== "" && !page.image && (
                    <View style={styles.render_text}>
                      <TextStyled type="h2">{page.text.trim()}</TextStyled>
                      <TextStyled style={styles.reader_pageNumber}>
                        Page: {page.page_number}
                      </TextStyled>
                    </View>
                  )}
                  {/* END TEXT */}
                </View>
              ))}
            </>
          )}
          {!volumeFound && <TextStyled>Aun no se carga Novela</TextStyled>}
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
    opacity: 0.6,
    marginBottom: 40 //
  },
  render_text: {
    paddingHorizontal: 10
  }
});

export default Reader;
