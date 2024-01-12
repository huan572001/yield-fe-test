import { extendTheme } from "@chakra-ui/react";

const colors = {
  deepGreen: {
    100: "#23936A",
    200: "#00A83E",
    500: "#23936A",
  },
  primary: {
    50: "#F5F5F5",
    100: "#EAEAEA",
    300: "#D6D6D6",
    400: "#8B8B8B",
    500: "#3D3D3D",
  },
  orange: "#F2994A",
  green: "#219653",
};

export const theme = extendTheme({
  colors,
  fonts: {
    body: "Inter, sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: "Inter, sans-serif",
        fontWeight: "800",
      },
    },
    Switch: {
      color: {
        deepGreen: "#23936A",
      },
    },
  },
});
