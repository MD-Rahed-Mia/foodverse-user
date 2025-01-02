// src/contexts/AuthContext.js
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { api_path_url, authToken } from "../secret";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [isFloatingAddressActive, setIsFloatingAddressActive] = useState(false);

  // Function to log in the user and store the token in localStorage
  const login = (token) => {
    setCurrentUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(() => {
    async function getUserProfile() {
      try {
        const id = Cookies.get("id");

        if (!id) return;

        const response = await axios.get(
          `${api_path_url}/user/profile-info?id=${id}`,
          {
            headers: {
              "x-auth-token": authToken,
            },
          }
        );

        // console.log(await response.data);

        const data = await response.data;

        if (data.success) {
          setUser(data.user);
        //  console.log(user);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      }
    }

    getUserProfile();
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    user,
    setIsFloatingAddressActive,
    isFloatingAddressActive
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
