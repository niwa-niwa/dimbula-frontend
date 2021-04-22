import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom"

import React from "react";
import { Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../../history";
import store from "../../store";

import SignIn from "../../views/sign/SignIn";


describe("Sign page Login test", () => {
  beforeEach(() => {});

  it("User can be able to login", () => {
    const { getByTestId, findByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <SignIn />
          </Switch>
        </Router>
      </Provider>
    );
    // screen.debug();

    expect(getByTestId("email")).toBeInTheDocument()
    expect(getByTestId("password")).toBeInTheDocument()
    expect(getByTestId("submit")).toBeInTheDocument()
  });

});
