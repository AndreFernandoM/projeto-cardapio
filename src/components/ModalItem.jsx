import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Typography from "@mui/material/Typography";

import "../css/ModalItem.css";

export default function ModalItem({ item, onClose }) {
  const [quantity, setQuantity] = useState(1);
  console.log(item);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleClick = () => {
    console.log(`Adicionado ${quantity} item(s) no carrinho:`, item);
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-item-container">
        <img src={item.foto} alt={item.name} />
        <div className="modal-item-infos">
          <Typography variant="h5" gutterBottom className="modal-item-title">
            {item?.name || "Item sem nome"}
          </Typography>
          <Typography variant="subtitle1" className="modal-item-description">
            {item?.description || "Descrição indisponível"}
          </Typography>
          <Typography className="modal-item-price">
            Preço: R${item?.price || "0.00"}
          </Typography>
        </div>

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
              readOnly: true
            }}
          />
          <IconButton onClick={handleIncrease} color="primary">
            <Add />
          </IconButton>
        </div>

        <Button
          variant="contained"
          className="modal-item-add-btn"
          color="primary"
          onClick={handleClick}
        >
          <Typography variant="button">Adicionar ao Carrinho</Typography>
        </Button>
      </Box>
    </Modal>
  );
}
