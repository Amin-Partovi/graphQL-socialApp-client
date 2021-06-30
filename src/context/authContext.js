import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = { user: null };

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: data => {},
  logout: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    default:
      return state;
  }
};

const AuthProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = userData => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "login",
      payload: userData,
    });
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "logout",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
