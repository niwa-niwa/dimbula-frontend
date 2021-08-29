import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import React from "react";
import { Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../../history";
import store from "../../store";

import ResendEmail from "../../views/sign/ResendEmail";

describe("Sign page Login test", () => {
  beforeEach(() => {});

  it("Confirm elements in ResendEmail.", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <ResendEmail />
          </Switch>
        </Router>
      </Provider>
    );
    // screen.debug();
    expect(screen.getByTestId('page_title').textContent).toBe("Re-Send Email");
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("submit")).toBeInTheDocument();
  });
});
