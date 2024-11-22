import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import logo from "../images/logo1.webp";

import "../css/menu.css";

const Menu = () => {
  const [itens, setItens] = useState([]);

  const [activeCategory, setActiveCategory] = useState("Entradas");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para logout, se necessário
    alert("Você foi desconectado.");
  };

  useEffect(() => {
    fetch("http://localhost/projeto-cardapio/php/itens.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na resposta do servidor.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          console.log("Lista de categorias e itens:", data.categories);
          setItens(data.categories); // Atualizar o estado com as categorias e itens
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }, []);

  return (
    <div className="menu-container">
      {}
      <div
        className="menu-icon-container"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <MenuIcon className="menu-icon" />
      </div>

      {}
      <div className={`dropdown-menu ${isDropdownOpen ? "active" : ""}`}>
        <Link to="/carrinho" className="dropdown-menu-item">
          Ir para Carrinho
        </Link>
        <button onClick={handleLogout} className="dropdown-menu-item">
          Logout
        </button>
      </div>

      <header className="menu-header">
        <div className="logo-container">
          <img src={logo} alt="Logo da empresa" className="logo" />
        </div>
        <h1 className="menu-title">Cardápio</h1>
        <nav className="menu-navigation">
          <div className="menu-categories">
            {itens.map((category) => (
              <button
                key={category.idCategoria}
                className={`menu-category ${
                  activeCategory === category.name ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </nav>
      </header>
      <div className="menu-items">
        {itens
          .find((category) => category.name === activeCategory)
          ?.items.map((item, index) => (
            <div key={index} className="menu-item">
              <div className="menu-item2">
                <img
                  className="menu-item-image"
                  src={item.foto}
                  width={150}
                  alt={item.name}
                  loading="lazy"
                />
                <div className="menu-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
              <span className="menu-item-price">R${item.price}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;
