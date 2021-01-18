import { useRecoilState } from "recoil";
import { Route, Redirect } from "react-router-dom";
//---------------------------------------------------//
import { isAuthenticated as isAuthenticatedAtom } from "./../recoil/auth/atoms";

const PrivateRoute = ({ component: Component, logout, ...routerProps }) => {
  const [isAuthenticated] = useRecoilState(isAuthenticatedAtom);
  return (
    <Route
      {...routerProps}
      render={(props) => {
        if (isAuthenticated) {
          return <Component logout={logout} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
