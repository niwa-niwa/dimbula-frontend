import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import React from "react";
import { Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../../history";
import store from "../../store";

import SignUp from "../../views/sign/SignUp";

describe("Sign page Login test", () => {
  beforeEach(() => {});

  it("Confirm elements in SignUp.", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <SignUp />
          </Switch>
        </Router>
      </Provider>
    );
    // screen.debug();
    expect(screen.getByTestId('page_title').textContent).toBe("Sign Up");
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("submit")).toBeInTheDocument();
    expect(screen.getByTestId("google_submit")).toBeInTheDocument();
  });
});
