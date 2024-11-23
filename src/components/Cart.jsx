import React, { useState } from "react";
import { Button, IconButton, TextField, Box, Typography } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import "../css/Cart.css";

const Cart = () => {
  const [items, setItems] = useState([
    {
      name: "Item Exemplo",
      description: "Descrição do item de exemplo.",
      price: 19.99,
      quantity: 1,
      foto: "https://placehold.co/150"
    },

    {
      name: "Item Exemplo 2",
      description: "Descrição do item de exemplo blabla.",
      price: 1.99,
      quantity: 1,
      foto: "https://placehold.co/150"
    }
  ]);

  const handleIncrease = (index) => {
    const newItems = [...items];
    newItems[index].quantity += 1;
    setItems(newItems);
  };

  const handleDecrease = (index) => {
    const newItems = [...items];
    if (newItems[index].quantity > 1) {
      newItems[index].quantity -= 1;
      setItems(newItems);
    }
  };

  const handleRemove = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="cart-container">
      <div className="cart-card">
        {" "}
        {/* Card que envolve as informações */}
        <Typography className="cart-title">Seu Carrinho</Typography>
        {items.length === 0 ? (
          <Typography className="empty-cart">
            Seu carrinho está vazio.
          </Typography>
        ) : (
          <div className="cart-items-list">
            {items.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-left">
                  <img
                    src={item.foto}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <Typography className="cart-item-name">
                      {item.name}
                    </Typography>
                    <Typography className="cart-item-description">
                      {item.description}
                    </Typography>
                  </div>
                </div>

                <div className="cart-item-right">
                  <Typography className="cart-item-price">
                    R${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <div className="cart-item-quantity">
                    <IconButton
                      onClick={() => handleDecrease(index)}
                      color="primary"
                    >
                      <Remove />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      variant="outlined"
                      size="small"
                      className="cart-item-quantity-input"
                      InputProps={{
                        readOnly: true
                      }}
                    />
                    <IconButton
                      onClick={() => handleIncrease(index)}
                      color="primary"
                    >
                      <Add />
                    </IconButton>
                  </div>
                  <IconButton
                    onClick={() => handleRemove(index)}
                    color="error"
                    className="cart-item-remove"
                  >
                    <Delete />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="cart-summary">
          <Typography className="total-text">
            <b>Total: R${calculateTotal()}</b>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="cart-confirm-btn"
          >
            <Typography variant="button">Confirmar Pedido</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
