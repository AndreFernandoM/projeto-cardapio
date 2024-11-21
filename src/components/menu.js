import React, { useState } from "react";
import "./menu.css";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "./logo1.webp";

const Menu = () => {
  const [categories] = useState([
    {
      name: "Entradas",
      items: [
        {
          name: "Batata Frita",
          description: "Porção de batata frita crocante.",
          price: "R$12,00",
        },
        {
          name: "Coxinha",
          description: "Deliciosa coxinha recheada com frango.",
          price: "R$6,00",
        },
        {
          name: "Bolinho de Bacalhau",
          description: "Bolinho de bacalhau artesanal.",
          price: "R$15,00",
        },
        {
          name: "Mini Quibe",
          description: "Quibe recheado com requeijão.",
          price: "R$10,00",
        },
        {
          name: "Onion Rings",
          description: "Anéis de cebola crocantes.",
          price: "R$14,00",
        },
        {
          name: "Palitos de Queijo",
          description: "Queijo muçarela empanado.",
          price: "R$18,00",
        },
        {
          name: "Carpaccio",
          description: "Fatias finas de carne temperada.",
          price: "R$25,00",
        },
        {
          name: "Guacamole",
          description: "Porção de guacamole com chips.",
          price: "R$20,00",
        },
        {
          name: "Camarão Empanado",
          description: "Camarão crocante com molho.",
          price: "R$30,00",
        },
        {
          name: "Tábua de Frios",
          description: "Seleção de queijos e embutidos.",
          price: "R$50,00",
        },
      ],
    },
    {
      name: "Pratos Principais",
      items: [
        {
          name: "Feijoada",
          description: "Feijoada completa com guarnições.",
          price: "R$35,00",
        },
        {
          name: "Churrasco",
          description: "Porção individual de churrasco.",
          price: "R$45,00",
        },
        {
          name: "Lasanha",
          description: "Lasanha à bolonhesa.",
          price: "R$40,00",
        },
        {
          name: "Moqueca",
          description: "Moqueca de peixe com dendê.",
          price: "R$50,00",
        },
        {
          name: "Risoto",
          description: "Risoto de cogumelos.",
          price: "R$38,00",
        },
        {
          name: "Strogonoff",
          description: "Strogonoff de frango com arroz.",
          price: "R$30,00",
        },
        {
          name: "Frango à Parmegiana",
          description: "Frango empanado com queijo.",
          price: "R$42,00",
        },
        {
          name: "Escondidinho",
          description: "Escondidinho de carne seca.",
          price: "R$35,00",
        },
        {
          name: "Camarão à Provençal",
          description: "Camarão ao alho e óleo.",
          price: "R$55,00",
        },
        {
          name: "Picanha",
          description: "Picanha grelhada com farofa.",
          price: "R$65,00",
        },
      ],
    },
    {
      name: "Bebidas",
      items: [
        {
          name: "Coca-Cola",
          description: "Refrigerante de 350ml.",
          price: "R$5,00",
        },
        { name: "Água", description: "Água mineral 500ml.", price: "R$3,00" },
        {
          name: "Suco de Laranja",
          description: "Suco natural de laranja.",
          price: "R$8,00",
        },
        { name: "Cerveja", description: "Long neck 330ml.", price: "R$10,00" },
        {
          name: "Caipirinha",
          description: "Caipirinha de limão.",
          price: "R$15,00",
        },
        {
          name: "Chá Gelado",
          description: "Chá gelado de pêssego.",
          price: "R$7,00",
        },
        {
          name: "Vinho Tinto",
          description: "Taça de vinho tinto.",
          price: "R$20,00",
        },
        {
          name: "Espumante",
          description: "Taça de espumante.",
          price: "R$25,00",
        },
        { name: "Whisky", description: "Dose de whisky.", price: "R$30,00" },
        {
          name: "Gin Tônica",
          description: "Gin com tônica e limão.",
          price: "R$25,00",
        },
      ],
    },
    {
      name: "Sobremesas",
      items: [
        {
          name: "Pudim",
          description: "Pudim de leite condensado.",
          price: "R$8,00",
        },
        {
          name: "Sorvete",
          description: "Bola de sorvete (vários sabores).",
          price: "R$5,00",
        },
        {
          name: "Petit Gâteau",
          description: "Bolo quente com sorvete.",
          price: "R$15,00",
        },
        {
          name: "Torta de Limão",
          description: "Torta com creme de limão.",
          price: "R$10,00",
        },
        {
          name: "Brigadeiro",
          description: "Brigadeiro tradicional.",
          price: "R$3,00",
        },
        {
          name: "Cheesecake",
          description: "Cheesecake com calda de frutas.",
          price: "R$12,00",
        },
        {
          name: "Churros",
          description: "Churros com doce de leite.",
          price: "R$8,00",
        },
        {
          name: "Brownie",
          description: "Brownie de chocolate com nozes.",
          price: "R$10,00",
        },
        {
          name: "Crepe de Morango",
          description: "Crepe recheado de morango.",
          price: "R$18,00",
        },
        {
          name: "Pavê",
          description: "Pavê de chocolate e biscoito.",
          price: "R$12,00",
        },
      ],
    },
  ]);

  const [activeCategory, setActiveCategory] = useState("Entradas");

  return (
    <div className="menu-container">
      <header className="menu-header">
        <div className="logo-container">
          <img src={logo} alt="Logo da empresa" className="logo" />
        </div>
        <h1 className="menu-title">Cardápio</h1>
        <nav className="menu-navigation">
          <MenuIcon className="menu-icon" />
          <div className="menu-categories">
            {categories.map((category) => (
              <button
                key={category.name}
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
        {categories
          .find((category) => category.name === activeCategory)
          .items.map((item) => (
            <div key={item.name} className="menu-item">
              <div className="menu-item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <span className="menu-item-price">{item.price}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;
