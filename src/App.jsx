import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Menu from "./components/menu";
import ForgotPassword from "./components/ForgotPassword";
import ModalItem from "./components/ModalItem";

// Exemplo de um item para testar
const itemTeste = {
  name: "Item Exemplo",
  description: "Descrição do item de exemplo.",
  price: "19.99",
  foto: "https://via.placeholder.com/150", // Coloque o link da imagem aqui
};

const App = () => {
  const [isModalOpen, setModalOpen] = useState(true); // Estado para controlar o modal

  // Função para fechar o modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

      {/* Exibir o ModalItem diretamente quando o estado de modal estiver aberto */}
      {isModalOpen && (
        <ModalItem open={isModalOpen} item={itemTeste} onClose={closeModal} />
      )}
    </Router>
  );
};

export default App;
