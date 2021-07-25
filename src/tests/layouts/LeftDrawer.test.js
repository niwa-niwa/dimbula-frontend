import React from "react";
import { Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import history from "../../history";
import store from "../../store";

import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import server from '../MockServer';
import LeftDrawer from "../../views/layouts/LeftDrawer";
import TaskFolderDialog from "../../views/task/modals/TaskFolderDialog";

describe("Left Drawer Test", () => {
  beforeAll(()=>{
    server.listen();
  });
  afterEach(()=>{
    server.resetHandlers();
    cleanup();
  })
  afterAll(()=>{
    server.close();
  })

  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <LeftDrawer />
            <TaskFolderDialog />
          </Switch>
        </Router>

      </Provider>
    );
  });

  it("Display elements in leftDrawer.", () => {
    // screen.debug();
    expect(screen.getByTestId('list-Inbox')).toBeInTheDocument();
    expect(screen.getByTestId('list-Today')).toBeInTheDocument();
    expect(screen.getByTestId('list-Stars')).toBeInTheDocument();
    expect(screen.getByTestId('list-All Tasks')).toBeInTheDocument();
    expect(screen.getByTestId('create_taskFolder_button')).toBeInTheDocument();
  });

  it("display user folders in leftDrawer.", async () => {
    expect(screen.queryByText("project C")).toBeNull();
    expect(await screen.findByText("project C")).toBeInTheDocument();
    expect(await screen.findByText("project B")).toBeInTheDocument();
    expect(await screen.findByText("project A")).toBeInTheDocument();
  });

});
