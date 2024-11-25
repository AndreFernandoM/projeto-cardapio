<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

include 'conn.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Nenhum dado enviado."]);
    exit;
}

$idUsuario = trim($data['idUsuario'] ?? '');
$idItem = trim($data['idItem'] ?? '');
$quantidade = intval($data['quantidade'] ?? 0);

if (empty($idUsuario) || empty($idItem) || $quantidade < 1) {
    echo json_encode([
        "status" => "error",
        "message" => "Dados insuficientes ou inválidos fornecidos."
    ]);
    echo $data;
    exit;
}

$stmtUsuario = $conn->prepare("SELECT id FROM tb_usuario WHERE id = ?");
$stmtUsuario->bind_param("i", $idUsuario);
$stmtUsuario->execute();
$resultUsuario = $stmtUsuario->get_result();

if ($resultUsuario->num_rows == 0) {
    echo json_encode(["status" => "error", "message" => "Usuário não encontrado."]);
    exit;
}

$stmtItem = $conn->prepare("
    SELECT quantidade 
    FROM tb_itens_pedido 
    WHERE idUsuario = ? AND idItem = ? AND finalizado = 0
");
$stmtItem->bind_param("ii", $idUsuario, $idItem);
$stmtItem->execute();
$resultItem = $stmtItem->get_result();

if ($resultItem->num_rows == 0) {
    echo json_encode(["status" => "error", "message" => "Item não encontrado no carrinho."]);
    exit;
}

$stmtUpdate = $conn->prepare("
    UPDATE tb_itens_pedido 
    SET quantidade = ? 
    WHERE idUsuario = ? AND idItem = ?
");
$stmtUpdate->bind_param("iii", $quantidade, $idUsuario, $idItem);

if ($stmtUpdate->execute()) {
    echo json_encode(["status" => "success", "message" => "Quantidade atualizada com sucesso."]);
} else {
    echo json_encode(["status" => "error", "message" => "Erro ao atualizar quantidade: " . $conn->error]);
}

$stmtUsuario->close();
$stmtItem->close();
$stmtUpdate->close();
$conn->close();
?>
