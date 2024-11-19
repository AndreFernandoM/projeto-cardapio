import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Bem-Vindo(a)</h1>
        <div className="logo">
          <span></span>
        </div>

        <form>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Senha"
              className="login-input"
              required
            />
          </div>
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
        <p className="signup-link">
          Não possue uma conta? <a href="/signup">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
