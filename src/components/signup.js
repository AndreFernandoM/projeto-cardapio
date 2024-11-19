import React, { useState } from "react";
import "./login.css";

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
    estado: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Dados enviados:", formData);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              className="login-input"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="date"
              name="dataNascimento"
              className="login-input"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="tel"
              name="telefone"
              placeholder="Telefone"
              className="login-input"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              className="login-input"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="login-input"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              className="login-input"
              value={formData.cep}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="rua"
              placeholder="Rua"
              className="login-input"
              value={formData.rua}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="numero"
              placeholder="Número"
              className="login-input"
              value={formData.numero}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="bairro"
              placeholder="Bairro"
              className="login-input"
              value={formData.bairro}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="complemento"
              placeholder="Complemento"
              className="login-input"
              value={formData.complemento}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="cidade"
              placeholder="Cidade"
              className="login-input"
              value={formData.cidade}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              className="login-input"
              value={formData.estado}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
