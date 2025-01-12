// src/components/PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Cookies from "js-cookie";

const PrivateRoute = ({ element: Component }) => {
  const [currentUser, setCurrentUser] = useState(
    // localStorage.getItem("user")
    Cookies.get("id")
  );

  return currentUser ? <Component /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
