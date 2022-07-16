import React from "react";
import { View } from "react-native";
import Footer from "../../components/footer/Footer";
import HeaderComponent from "../../components/header/HeaderComponent";
import LigthNovelList from "../../components/ligthNovelList/LigthNovelList";
import { Dimensions } from "react-native";

const screen = Dimensions.get("screen");

const isTabled = screen.width > 500 ? 30 : 80;
function Home() {
  return (
    <View style={{ height: "90%", paddingBottom: isTabled }}>
      <HeaderComponent />
      <LigthNovelList />
      <Footer />
    </View>
  );
}

export default Home;
