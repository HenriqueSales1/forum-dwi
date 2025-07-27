import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = () => {
  const { user, isLoading } = useContext(AuthContext);

  const isAdmin = user?.permsId === 1;

  if (isLoading) {
    return <p>Verificando autenticação...</p>;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
