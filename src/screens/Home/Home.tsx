import React from "react";
import { View } from "react-native";
import HeaderComponent from "../../components/header/HeaderComponent";
import LigthNovelList from "../../components/ligthNovelList/LigthNovelList";

function Home() {
  return (
    <View style={{ height:"100%" }}>
      <HeaderComponent />
      <LigthNovelList />
    </View>
  );
}

export default Home;
