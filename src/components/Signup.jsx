import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, TextField } from "@mui/material";
import "../css/login.css";
import "../css/signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    dataNascimento: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    complemento: "",
    cidade: "",
    estado: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) => /^\d{10,11}$/.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    if (!validatePhone(formData.telefone)) {
      alert(
        "Por favor, insira um telefone válido (apenas números, com 10 ou 11 dígitos)."
      );
      return;
    }

    fetch("http://localhost/projeto-cardapio/php/cadastro.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.text())
      .then((data) => {
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
      });
  };

  return (
    <div className="sigup-container">
      <div className="sigup-box">
        <Typography variant="h4" className="login-title">
          Cadastro
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="nome"
            label="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="dataNascimento"
            label="Data de Nascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            name="telefone"
            label="Telefone"
            type="tel"
            value={formData.telefone}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="cep"
            label="CEP"
            value={formData.cep}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="rua"
            label="Rua"
            value={formData.rua}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="numero"
            label="Número"
            value={formData.numero}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="bairro"
            label="Bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="complemento"
            label="Complemento"
            value={formData.complemento}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="cidade"
            label="Cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="estado"
            label="Estado"
            value={formData.estado}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="senha"
            label="Senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="confirmarSenha"
            label="Confirmar Senha"
            type="password"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <Button
            className="login-button"
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
          >
            Cadastrar
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

export default Signup;
