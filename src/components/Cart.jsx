import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  IconButton,
  TextField,
  Box,
  Typography,
  Pagination
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import "../css/Cart.css";
import { AuthContext } from "./AuthContext";

const ITEMS_PER_PAGE = 5;

const Cart = () => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [pedidos, setPedidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(AuthContext);

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
            const pedidosAtualizados = data.pedidos || [];
            setPedidos(pedidosAtualizados);

            const totalItems = pedidosAtualizados.reduce(
              (acc, item) => acc + parseInt(item.quantity, 10),
              0
            );
            setCartQuantity(totalItems);
          } else {
            console.error(data.message);
            setCartQuantity(0);
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar os itens do carrinho:", error);
        });
    }
  }, [user?.id]);

  const handleIncrease = (index) => {
    const newPedidos = [...pedidos];
    const item = newPedidos[index];
    item.quantity += 1;
    setPedidos(newPedidos);

    fetch(
      "http://localhost/projeto-cardapio/php/quantidade-item-carrinho.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idUsuario: user.id,
          idItem: item.idItem,
          quantidade: item.quantity
        })
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "success") {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar a quantidade no backend:", error);
      });
  };

  const handleDecrease = (index) => {
    const newPedidos = [...pedidos];
    const item = newPedidos[index];
    if (item.quantity > 1) {
      item.quantity -= 1;
      setPedidos(newPedidos);

      fetch(
        "http://localhost/projeto-cardapio/php/quantidade-item-carrinho.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idUsuario: user.id,
            idItem: item.idItem,
            quantidade: item.quantity
          })
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status !== "success") {
            console.error(data.message);
          }
        })
        .catch((error) => {
          console.error("Erro ao atualizar a quantidade no backend:", error);
        });
    }
  };

  const handleRemove = (index) => {
    const newPedidos = pedidos.filter((_, i) => i !== index);
    setPedidos(newPedidos);
  };

  const calculateTotal = () => {
    return pedidos
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedItems = pedidos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="cart-container">
      <div className="cart-card">
        <Typography className="cart-title">Seu Carrinho</Typography>
        {pedidos.length === 0 ? (
          <Typography className="empty-cart">
            Seu carrinho está vazio.
          </Typography>
        ) : (
          <>
            <div className="cart-items-list">
              {displayedItems.map((item, index) => (
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
                        {item.descricao}
                      </Typography>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <Typography className="cart-item-price">
                      R${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <div className="cart-item-quantity">
                      <IconButton
                        onClick={() => handleDecrease(index + startIndex)}
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
                        onClick={() => handleIncrease(index + startIndex)}
                        color="primary"
                      >
                        <Add />
                      </IconButton>
                    </div>
                    <IconButton
                      onClick={() => handleRemove(index + startIndex)}
                      color="error"
                      className="cart-item-remove"
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              count={Math.ceil(pedidos.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px"
              }}
            />
          </>
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
