<?php
    $servidor = "localhost";
    $usuario = "root";
    $senha = "";  
    $banco = "db_restaurante";

    $conn = new mysqli($servidor, $usuario, $senha, $banco);

    if ($conn->connect_error) {
        die("Falha na conexão: " . $conn->connect_error);
    }
    echo "Conexão bem-sucedida com o banco de dados!";
?>
