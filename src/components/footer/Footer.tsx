import { StyleSheet, View } from "react-native";
import FaIcon from "react-native-vector-icons/FontAwesome";
import FoIcon from "react-native-vector-icons/Fontisto";
import { ToastAndroid, Dimensions } from "react-native";
import { useNavigate } from "react-router-native";

const iconSize = 25;
const iconColor = "#000";

const screen = Dimensions.get("screen");
const isTable = screen.width > 500;
const iconRoundSize = isTable ? 18 : 10;

function Footer() {
  const navegate = useNavigate();
  const onHome = () => {
    navegate("/");
    ToastAndroid.show("HOME", 1000);
    console.log("HOME");
  };

  return (
    <View style={styles.footer_container}>
      <View style={styles.footer_box}>
        <View onTouchEnd={onHome}>
          <FaIcon
            style={styles.footer_icon}
            name="home"
            size={iconSize}
            color={iconColor}
          />
        </View>
        <View onTouchEnd={() => ToastAndroid.show("BOOK", 500)}>
          <FaIcon
            style={styles.footer_icon}
            name="book"
            size={iconSize}
            color={iconColor}
          />
        </View>
        <View onTouchEnd={() => ToastAndroid.show("PLUS", 500)}>
          <FaIcon
            style={styles.footer_icon}
            name="plus"
            size={iconSize}
            color={iconColor}
          />
        </View>
        <View onTouchEnd={() => ToastAndroid.show("HISTORY", 500)}>
          <FaIcon
            style={styles.footer_icon}
            name="history"
            size={iconSize}
            color={iconColor}
          />
        </View>
        <View onTouchEnd={() => ToastAndroid.show("SETTINGS", 500)}>
          <FoIcon
            style={styles.footer_icon}
            name="player-settings"
            size={iconSize}
            color={iconColor}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer_container: {
    backgroundColor: "green",
    height: 80
  },
  footer_box: {
    flexDirection: "row",
    backgroundColor: "yellow",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around"
  },
  footer_icon: {
    backgroundColor: "cyan",
    padding: iconRoundSize,
    borderRadius: 25
  }
});

export default Footer;
