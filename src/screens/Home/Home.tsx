import React, { useEffect, useState } from "react";
import { BackHandler, ToastAndroid, View } from "react-native";
import Footer from "../../components/footer/Footer";
import HeaderComponent from "../../components/header/HeaderComponent";
import LigthNovelList from "../../components/ligthNovelList/LigthNovelList";
import { Dimensions } from "react-native";

const screen = Dimensions.get("screen");

const isTabled = screen.width > 500;
const heigthFooter = isTabled ? 30 : 80;

function Home() {
  const [exitApp, setExitApp] = useState(0);

  const handleBackButtonClick = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000); // 2 seconds to tap second-time

    if (exitApp === 0) {
      setExitApp(exitApp + 1);
      ToastAndroid.show("Presione denuevo para salir", ToastAndroid.SHORT);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [exitApp]);

  return (
    <View style={{ height: "90%", paddingBottom: heigthFooter }}>
      <HeaderComponent />
      <LigthNovelList />
      <Footer />
    </View>
  );
}

export default Home;
