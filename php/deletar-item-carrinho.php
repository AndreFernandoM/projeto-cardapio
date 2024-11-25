<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "projeto_cardapio");

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Erro na conexão com o banco de dados"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

$idUsuario = $input['idUsuario'] ?? null;
$idItem = $input['idItem'] ?? null;

if (!$idUsuario || !$idItem) {
    echo json_encode(["status" => "error", "message" => "Dados incompletos"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM carrinho WHERE id_usuario = ? AND id = ?");
$stmt->bind_param("ii", $idUsuario, $idItem);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Item deletado com sucesso"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erro ao deletar item"]);
}

$stmt->close();
$conn->close();
?>
