import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import React from "react";
import { Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../../history";
import store from "../../store";

import SignIn from "../../views/sign/SignIn";

describe("Sign page Login test", () => {
  beforeEach(() => {});

  it("Confirm elements that are required without login.", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <SignIn />
          </Switch>
        </Router>
      </Provider>
    );
    // screen.debug();
    expect(screen.getByTestId('page_title').textContent).toBe("Sign In");
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("submit")).toBeInTheDocument();
    expect(screen.getByTestId("google_submit")).toBeInTheDocument();
    expect(screen.getByTestId("save_checkbox")).toBeInTheDocument();
  });
});
