import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PATHS from "../../const/paths";

const AuthRoute = ({ component: Component, layout: Layout, ...props }) => {
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  const render = () => {
    if (!isSignedIn) {
      return <Redirect to={PATHS.SIGN_IN} />;
    }
    return (
      <Route {...props}>
        <Layout>
          <Component />
        </Layout>
      </Route>
    );
  };
  return render();
};
export default AuthRoute;
