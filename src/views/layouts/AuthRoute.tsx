import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PATHS from "../../const/paths";

type Props_Auth = {
  component: any;
  layout: any;
};

const AuthRoute: Props_Auth & any = ({
  component: Component,
  layout: Layout,
  ...props
}: {
  component: any;
  layout: any;
  props: any;
}) => {
  const isSignedIn = useSelector((state: any) => state.user.isSignedIn);

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
