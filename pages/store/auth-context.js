import React, { useState, useEffect } from "react";
import { client } from "../../libs/client";

const AuthContext = React.createContext({
  isLoggedIn: false,
  loginError: false,
  isLoading: false,
  onLogin: (email, password) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("hai");
    if (userData) {
      const storedUserLoginInformation = JSON.parse(userData);
      const token = storedUserLoginInformation?.token;
      if (token) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  async function loginHandler(usernameValue, passwordValue) {
    setIsLoading(true);
    setLoginError(false);
    const response = await client.post("/authenticate", {
      username: usernameValue,
      password: passwordValue,
    });
    setIsLoading(false);
    if (response.status === 200) {
      const dataUser = response.data;
      setLoginError(true);
      setIsLoggedIn(true);
      localStorage.setItem("hai", JSON.stringify(dataUser));
      alert("Your role is: " + dataUser.role[0].authority);
    } else {
      setIsLoggedIn(false);
      setLoginError(true);

      // alert("gagal login");
    }
  }

  function logoutHandler() {
    localStorage.removeItem("hai");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isLoading: isLoading,
        loginError: loginError,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
