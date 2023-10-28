import React, { useState, useEffect, createContext } from "react";
import { setToken, getToken, removeToken } from "../api/token";
import { useUser } from "../hooks";




export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

export function AuthProvider(props) {
  console.log("llega")
  const { children } = props;
  const [auth, setAuth] = useState(undefined);
  const { getMe } = useUser();

  //refresh del token 
  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const me = await getMe(token);
        setAuth({ token, me });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  const login = async (token) => {
    //lo setea por medio de la funcion setToken que se encuentra en api
    console.log("login")
    
    setToken(token);
    const me = await getMe(token);
    setAuth({ token, me });
;
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      
    }
  };

  const valueContext = {
    //llamamos a las funciones creadas anteriormente para que sean implementadas en el ValueContext
    auth,
    login,
    logout,
  };

  //elimina flash
  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}