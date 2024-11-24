import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";

import ModalItem from "./ModalItem";
import { AuthContext } from "./AuthContext";

import logo from "../images/logo1.webp";
import "../css/menu.css";

const Menu = () => {
  const [itens, setItens] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Entradas");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const { user } = useContext(AuthContext);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost/projeto-cardapio/php/itens.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na resposta do servidor.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setItens(data.categories);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetch("http://localhost/projeto-cardapio/php/listar-carrinho.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idUsuario: user.id })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na resposta do servidor.");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === "success") {
            const pedidos = data.pedidos || [];
            const totalItems = pedidos.reduce(
              (acc, item) => acc + parseInt(item.quantity, 10),
              0
            );
            setCartQuantity(totalItems);
            console.log("total itens: ", totalItems, " ", pedidos);
          } else {
            console.error(data.message);
            setCartQuantity(0);
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar os itens do carrinho:", error);
        });
    }
  }, [modalOpen, user?.id]);

  return (
    <div className="menu-container">
      <Link to="/carrinho" className="carrinho-btn">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={cartQuantity} color="primary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </Link>

      <Link to="/" className="logout-btn">
        <IconButton aria-label="logout" color="gray">
          <LogoutIcon />
        </IconButton>
      </Link>

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
            <div
              key={index}
              className="menu-item"
              onClick={() => handleOpenModal(item)}
            >
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
                  <div className="menu-item-info-wrap-desc">
                    <p className="menu-item-info-desc">{item.description}</p>
                  </div>
                </div>
              </div>

              <span className="menu-item-price">R${item.price}</span>
            </div>
          ))}
      </div>
      {modalOpen && (
        <ModalItem
          open={modalOpen}
          item={selectedItem}
          userId={user.id}
          itemId={selectedItem.id}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Menu;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}));
