import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/glyphmaps/FontAwesome.json";
import FaIcon from "react-native-vector-icons/FontAwesome";
import { useToast } from "react-native-toast-notifications";
// import { ToastAndroid } from "react-native";

const iconSize = 25;
const iconColor = "#000";

function HeaderComponent() {
  const toast = useToast();
  useEffect(() => {
    // toast.show("Hello World w");
    // ToastAndroid.show("Hello world", 2);
  }, []);

  return (
    <View style={styles.header_container}>
      <View style={styles.header_title}>
        <Text style={styles.header_text}>Light Novels(n)</Text>
      </View>
      <View style={styles.header_iconsNav}>
        <FaIcon
          style={styles.header_iconsNav__item}
          name="search"
          size={iconSize}
          color={iconColor}
        />
        <FaIcon
          style={styles.header_iconsNav__item}
          name="rotate-right"
          size={iconSize}
          color={iconColor}
        />
      </View>
    </View>
  );
}

const header_containerHeight = 50;
const header_containerPaddingH = 15;
const header_titleWidth = 60;

const styles = StyleSheet.create({
  header_container: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "row",
    backgroundColor: "cyan",
    paddingHorizontal: header_containerPaddingH,
    height: header_containerHeight,
    alignItems: "center"
  },
  header_text: {
    fontSize: 20,
    fontWeight: "bold"
  },
  header_title: {
    // backgroundColor: "yellow",
    width: header_titleWidth + "%"
  },
  header_iconsNav: {
    flexDirection: "row",
    // backgroundColor: "green",
    width: 100 - header_titleWidth + "%",
    justifyContent: "flex-end"
  },
  header_iconsNav__item: {
    marginLeft: 10
  }
});

export default HeaderComponent;
