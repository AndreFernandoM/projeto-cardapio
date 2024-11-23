import React, { useState } from "react";
import "../css/ItemDetalhes.css";

const ItemDetalhes = ({ item }) => {
  const [quantidade, setQuantidade] = useState(1);

  const incrementar = () => setQuantidade(quantidade + 1);
  const decrementar = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  const adicionarAoPedido = () => {
    alert(`Adicionado ${quantidade}x "${item.nome}" ao pedido!`);
  };

  return (
    <div className="item-detalhes">
      <div className="item-imagem">
        <img src={item.imagem} alt={item.nome} />
      </div>
      <div className="item-informacoes">
        <h1 className="item-nome">{item.nome}</h1>
        <p className="item-descricao">{item.descricao}</p>
        <div className="item-preco">
          <span>R$</span>
          <strong>{item.preco.toFixed(2)}</strong>
        </div>
        <div className="item-interacao">
          <div className="item-quantidade">
            <button onClick={decrementar}>-</button>
            <span>{quantidade}</span>
            <button onClick={incrementar}>+</button>
          </div>
          <button className="adicionar-pedido" onClick={adicionarAoPedido}>
            Adicionar ao Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetalhes;
