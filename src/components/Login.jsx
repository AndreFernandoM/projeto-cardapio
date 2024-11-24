import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { AuthContext } from "./AuthContext";

import "../css/login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost/projeto-cardapio/php/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email,
        senha: formData.senha
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na resposta do servidor.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          login({
            id: data.user.id,
            nome: data.user.nome,
            email: data.user.email
          });
          navigate("/menu");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Bem-Vindo(a)</h1>
        <div className="logo">
          <span></span>
        </div>

        <form action="../php/login.php" method="post" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Senha"
              name="senha"
              className="login-input"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
        <p className="signup-link">
          Não possue uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
        <p className="forgot-password">
          Esqueci minha senha! <Link to="/esqueci-senha">Recuperar</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
