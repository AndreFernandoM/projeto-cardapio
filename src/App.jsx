import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Menu from "./components/Menu";
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
