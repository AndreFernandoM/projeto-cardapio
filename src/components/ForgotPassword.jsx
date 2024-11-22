import React, { useState } from "react";
import "../css/login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("E-mail para recuperação:", email);
    alert(
      "Se o e-mail estiver cadastrado, enviaremos instruções para recuperação."
    );
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Recuperar Senha</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="login-input"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Enviar
          </button>
        </form>
        <p className="signup-link">
          Lembrou a senha? <a href="/">Faça login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
