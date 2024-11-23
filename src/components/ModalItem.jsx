import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import "../css/ModalItem.css";

export default function ModalItem({ item }) {
  const [quantity, setQuantity] = useState(1);

  // Lógica para controle de quantidade
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // Função para adicionar o item ao carrinho
  const handleClick = () => {
    console.log(`Adicionado ${quantity} item(s) no carrinho:`, item);
  };

  return (
    <Modal
      open={true} // O modal será sempre aberto enquanto esta rota estiver ativa
      onClose={() => window.history.back()} // Volta para a página anterior quando fechar o modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-item-container">
        <img src={item.foto} alt={item.name} />
        <Typography className="modal-item-title">
          {item?.name || "Item sem nome"}
        </Typography>
        <Typography className="modal-item-description">
          {item?.description || "Descrição indisponível"}
        </Typography>
        <Typography className="modal-item-price">
          Preço: R${item?.price || "0.00"}
        </Typography>

        <div className="modal-item-quantity-container">
          <IconButton onClick={handleDecrease} color="primary">
            <Remove />
          </IconButton>
          <TextField
            value={quantity}
            variant="outlined"
            size="small"
            className="modal-item-quantity-input"
            InputProps={{
              readOnly: true,
            }}
          />
          <IconButton onClick={handleIncrease} color="primary">
            <Add />
          </IconButton>
        </div>

        <Button
          variant="contained"
          className="modal-item-add-btn"
          onClick={handleClick}
        >
          Adicionar ao Carrinho
        </Button>
      </Box>
    </Modal>
  );
}
