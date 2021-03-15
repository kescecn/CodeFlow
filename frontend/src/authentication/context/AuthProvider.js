import React, { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducer/authReducer";
import authState from "../state";

export const AuthContext = createContext({});

//destrukturiranje djece ovog komponenta
export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, authState, () => {
    debugger;
    const auth =
      localStorage.auth !== undefined
        ? JSON.parse(localStorage.auth)
        : authState;
    return auth;
  });

  useEffect(() => {
    localStorage.auth = JSON.stringify(auth);
    console.log(auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, authDispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
