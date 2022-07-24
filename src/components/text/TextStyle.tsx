import { StyleSheet, Text, TextProps } from "react-native";
import { Dimensions } from "react-native";

const screen = Dimensions.get("screen");
const isTabled = screen.width > 500;

function TextStyled({
  type = "h3",
  children,
  fontWeight,
  style,
  ...propss
}: ITextSizeProps) {
  const fontSized = textSizeMap[type as keyof typeof textSizeMap];
  const styles = StyleSheet.create({
    text: {
      fontSize: isTabled ? fontSized : fontSized / 1.8,
      fontWeight
    }
  });
  const estilos = [styles.text, style];

  return (
    <Text {...propss} style={estilos}>
      {children}
    </Text>
  );
}

const textSizeMap = {
  h1: 30,
  h2: 25,
  h3: 20,
  h4: 15,
  h5: 10,
  h6: 5
};

interface ITextSizeProps extends TextProps {
  type?: keyof typeof textSizeMap;
  fontWeight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | "bold"
    | "normal"
    | undefined;
  style?: any;
  children?: any;
  propss?: any;
}

export default TextStyled;
