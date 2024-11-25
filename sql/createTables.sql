'db_restaurante'

CREATE TABLE tb_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    data_nascimento DATE,
    telefone VARCHAR(20),
    senha VARCHAR(255) NOT NULL,
    cep VARCHAR(10),
    rua VARCHAR(255),
    numero VARCHAR(10),
    bairro VARCHAR(100),
    complemento VARCHAR(100),
    cidade VARCHAR(100),
    estado CHAR(2)
);

CREATE TABLE tb_categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE tb_itens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idCategoria INT,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    foto BLOB,
    preco DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idCategoria) REFERENCES tb_categoria(id)
);

CREATE TABLE tb_itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    idItem INT,
    quantidade INT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    finalizado BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (idUsuario) REFERENCES tb_usuario(id),
    FOREIGN KEY (idItem) REFERENCES tb_itens(id)
);
