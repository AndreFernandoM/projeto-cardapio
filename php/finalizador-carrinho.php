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

if (empty($idUsuario)) {
    echo json_encode([
        "status" => "error",
        "message" => "ID do usuário não fornecido."
    ]);
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

$stmtItens = $conn->prepare("
    SELECT id 
    FROM tb_itens_pedido 
    WHERE idUsuario = ? AND finalizado = 0
");
$stmtItens->bind_param("i", $idUsuario);
$stmtItens->execute();
$resultItens = $stmtItens->get_result();

if ($resultItens->num_rows == 0) {
    echo json_encode(["status" => "error", "message" => "Nenhum item pendente no carrinho."]);
    exit;
}

$stmtFinalizar = $conn->prepare("
    UPDATE tb_itens_pedido 
    SET finalizado = 1 
    WHERE idUsuario = ? AND finalizado = 0
");
$stmtFinalizar->bind_param("i", $idUsuario);

if ($stmtFinalizar->execute()) {
    echo json_encode(["status" => "success", "message" => "Carrinho finalizado com sucesso."]);
} else {
    echo json_encode(["status" => "error", "message" => "Erro ao finalizar carrinho: " . $conn->error]);
}

$stmtUsuario->close();
$stmtItens->close();
$stmtFinalizar->close();
$conn->close();

?>
