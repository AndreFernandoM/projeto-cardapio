import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Menu from "./components/menu";
import ForgotPassword from "./components/ForgotPassword";
import ModalItem from "./components/ModalItem";
import Cart from "./components/Cart"; // Importando o componente Cart

const itemTeste = {
  name: "Item Exemplo",
  description: "Descrição do item de exemplo.",
  price: "19.99",
  foto: "https://via.placeholder.com/150", // Coloque o link da imagem aqui
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/carrinho" element={<Cart />} />{" "}
        <Route
          path="/modal/:itemId"
          element={<ModalItem item={itemTeste} />} // Passando o item como prop
        />
      </Routes>
    </Router>
  );
};

export default App;
