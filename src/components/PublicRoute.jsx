import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return user ? navigate("/") : children;
};

export default PublicRoute;
