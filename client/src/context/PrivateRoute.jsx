import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <h1>loading...</h1>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location?.pathname} to={"/register"} />;
};

export default PrivateRoute;
