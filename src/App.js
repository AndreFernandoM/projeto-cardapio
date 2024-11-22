import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Menu from "./components/menu";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  /*
  
  TODO: CONTEXT 
  
  */
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
        {/* Adicionar depois rota carrinho e detalhes*/}
      </Routes>
    </Router>
  );
};

export default App;
