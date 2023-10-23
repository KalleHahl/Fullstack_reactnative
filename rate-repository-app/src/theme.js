import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    white: "#FFFFFF",
    appBarColor: "#8570EF",
    mainBackground: "#e1e4e8",
    black: "#000000",
    red: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: Platform.select({
    android: "Roboto",
    ios: "Arial",
    default: "System",
  }),
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
