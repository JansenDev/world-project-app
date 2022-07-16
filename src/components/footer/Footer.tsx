import { StyleSheet, Text, View } from "react-native";

function Footer() {
  console.log("");

  return (
    <View style={styles.footer_container}>
      <Text>Footer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer_container: {
    backgroundColor: "green",
    height:80
  }
});

export default Footer;
