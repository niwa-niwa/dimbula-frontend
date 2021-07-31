import { createTheme } from "@material-ui/core/styles";

export const customTheme = createTheme({
  palette: {
    primary: {
      dark: "#467eac",
      main: "#64b5f6",
      light: "#83c3f7",
      contrastText: "#ffffff",
    },
    secondary: {
      dark: "#aa2e25",
      main: "#f44336",
      light: "#f6685e",
      contrastText: "#ffffff",
    },
  },
});
