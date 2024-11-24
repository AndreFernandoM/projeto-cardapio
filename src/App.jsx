import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Menu from "./components/Menu";
import ForgotPassword from "./components/ForgotPassword";
import ModalItem from "./components/ModalItem";

import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const itemTeste = {
  name: "Item Exemplo",
  description: "Descrição do item de exemplo.",
  price: "19.99",
  foto: "https://via.placeholder.com/150"
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Signup />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} />
      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        }
      />
      <Route
        path="/carrinho"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default App;
