import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Nova senha enviada por e-mail.");

    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Typography variant="h4" className="login-title">
          Recuperar Senha
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Digite seu e-mail"
            value={email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <Button
            className="login-button"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Enviar
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            fullWidth
            style={{ marginTop: "10px" }}
          >
            Voltar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
