import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { customTheme } from './views/styles/customTheme';

import App from "./views/App";
import { MuiThemeProvider } from "@material-ui/core";

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={customTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.querySelector("#root")
);
