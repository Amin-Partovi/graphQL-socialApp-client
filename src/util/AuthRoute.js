import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const AuthRoute = ({ component:Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props => (!user ? <Redirect to="/login" /> : <Component {...props} />)}
    />
  );
};

export default AuthRoute;
