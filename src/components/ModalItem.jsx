import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

export default function ModalItem({ open, item, onClose }) {
  const handleClick = () => {
    console.log("clicou botei no carrinho hehe", item);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <img src={item.foto} alt="https://placehold.co/300" />
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {item?.name || "Item sem nome"}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {item?.description || "Descrição indisponível"}
        </Typography>
        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
          Preço: R${item?.price || "0.00"}
        </Typography>
        <Button variant="contained" onClick={handleClick}>
          Contained
        </Button>
      </Box>
    </Modal>
  );
}
