import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Menu from "./components/menu";
import ForgotPassword from "./components/ForgotPassword";
import ItemDetalhes from "./components/ItemDetalhes";

const App = () => {
  const itemTeste = {
    nome: "Rodeio Duplo",
    descricao:
      "Um hambúrguer com duas carnes bovinas grelhadas, pão com gergelim, queijo derretido, onion rings, molho barbecue e maionese BK.",
    preco: 17.92,
    imagem: "/imagens/burger.jpg",
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/item-detalhes"
          element={<ItemDetalhes item={itemTeste} />}
        />{" "}
      </Routes>
    </Router>
  );
};

export default App;
