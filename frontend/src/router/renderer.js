import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../authentication/context/AuthProvider";
import Layout from "../components/Layout";

const Renderer = (route) => {
  const { auth, authDispatch } = useContext(AuthContext);

  document.title = route.title || "CodeFlow";
  if (route.authenticated && !auth.data) {
    return <Redirect to="/" />;
  }

  if ((route.path === "/" || route.path === "/register") && auth.data) {
    return <Redirect to="/home" />;
  }

  return (
    <RouteWrapper
      path={route.path}
      component={route.component}
      layout={Layout}
    />
  );
};

function RouteWrapper({ component: Component, layout: Layout, path }) {
  return (
    <Route
      path={path}
      exact
      render={(props) => (
        <Layout path={path}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

export default Renderer;
