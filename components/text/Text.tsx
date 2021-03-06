import React from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Svg, Image as SvgImage } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";

type Size = "sm" | "md" | "lg" | number;

interface IStyles {
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
}

interface Props {
  children?: React.ReactNode;
  label?: string;
  title?: boolean;
  bread?: boolean;
  size?: Size;
  centered?: boolean;
  color?: string;
  button?: {
    form?: "square" | "rounded";
    bgColor?: string;
    onClick: () => any;
  };
}

const TicTacText = ({
  size,
  title,
  label,
  bread,
  centered,
  color,
  children,
  ...props
}: Props) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return 25;
      case "md":
        return 50;
      case "lg":
        return 100;
      default:
        return size;
    }
  };

  const getImgUri = () => {
    switch (label?.toLocaleLowerCase()) {
      case "play":
        return require("../../assets/images/text/PLAY_PNG.png");
      case "profile":
        return require("../../assets/images/text/PROFILE_PNG.png");
      case "join":
        return require("../../assets/images/text/JOIN_PNG.png");
      case "host":
        return require("../../assets/images/text/HOST_PNG.png");
      case "about us":
        require("../../assets/images/text/ABOUTUS_PNG.png");
      case "help":
        return require("../../assets/images/text/HELP_PNG.png");
      case "matchmaking":
        return require("../../assets/images/text/MATCHMAKING_PNG.png");
      case "back":
        return require("../../assets/images/text/BACK_PNG.png");
    }
  };

  const getImg = () => {
    const img = getImgUri();

    const SVG_STYLE = [style().container, { height: getSize() }];
    const SVG_TEXT = (
      <Svg width="100%" height="100%">
        <SvgImage width="100%" height="100%" href={img} />
      </Svg>
    );

    return img ? (
      props.button ? (
        <TouchableOpacity
          style={SVG_STYLE}
          onPress={() => props.button?.onClick()}
        >
          {SVG_TEXT}
        </TouchableOpacity>
      ) : (
        <View style={SVG_STYLE}>{SVG_TEXT}</View>
      )
    ) : (
      getText()
    );
  };
  const getText = () => {
    return props.button ? (
      <TouchableOpacity
        style={title && { width: "100%" }}
        onPress={() => props.button?.onClick()}
      >
        <Text style={style({ bread }, getSize(), centered, color).text}>
          {children ? children : label}
        </Text>
      </TouchableOpacity>
    ) : (
      <View style={title && { width: "100%" }}>
        <Text style={style({ bread }, getSize(), centered, color).text}>
          {children ? children : label}
        </Text>
      </View>
    );
  };

  return <>{title ? getImg() : getText()}</>;
};

const style = (
  type?: { bread?: boolean; title?: boolean },
  size?: number,
  centered?: boolean,
  color?: string
): IStyles => {
  return StyleSheet.create({
    container: {
      width: useWindowDimensions().width,
      margin: type?.bread ? 0 : 10,
    },
    text: {
      ...Platform.select({
        ios: {
          fontFamily: type?.bread ? "Helvetica" : "FredokaOne_400Regular",
        },
        android: {
          fontFamily: type?.bread ? "sans-serif" : "FredokaOne_400Regular",
        },
        default: {
          fontFamily: type?.bread ? "sans-serif" : "FredokaOne_400Regular",
        },
      }),
      fontSize: size || 20,
      textAlign: centered ? "center" : "left",
      color: color ? color : "#000",
    },
  });
};

export default TicTacText;
