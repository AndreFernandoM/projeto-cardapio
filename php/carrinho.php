<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

include 'conn.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo "Erro: Nenhum dado foi enviado.";
    exit;
}

$idUsuario = trim($data['idUsuario'] ?? '');
$idItem = trim($data['idItem'] ?? '');
$quantidade = $data['quantidade'] ?? '';
$preco = trim($data['preco'] ?? '');

if (empty($idUsuario)) {
    echo "Erro: ID do usuário não fornecido.";
    exit;
}

$stmtUsuario = $conn->prepare("SELECT id FROM tb_usuario WHERE id = ?");
$stmtUsuario->bind_param("i", $idUsuario);
$stmtUsuario->execute();
$resultUsuario = $stmtUsuario->get_result();

if ($resultUsuario->num_rows == 0) {
    echo "Erro: Usuário não encontrado.";
    exit;
}

$finalizado = (isset($data['finalizado']) && $data['finalizado']) ? 1 : 0;

$stmt = $conn->prepare("INSERT INTO tb_itens_pedido (idUsuario, idItem, quantidade, preco, finalizado) VALUES (?, ?, ?, ?, ?)");

if ($stmt) {
    $stmt->bind_param("iiidb", $idUsuario, $idItem, $quantidade, $preco, $finalizado);

    if ($stmt->execute()) {
        echo "Novo item adicionado no carrinho com sucesso!";
    } else {
        echo "Erro ao inserir item ao carrinho: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Erro ao preparar a declaração SQL: " . $conn->error;
}

$conn->close();
?>
