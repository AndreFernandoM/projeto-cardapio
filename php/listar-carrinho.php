<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

include 'conn.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Nenhum dado foi enviado."
    ]);
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

// Verifica se o usuário existe
$stmtUsuario = $conn->prepare("SELECT id FROM tb_usuario WHERE id = ?");
$stmtUsuario->bind_param("i", $idUsuario);
$stmtUsuario->execute();
$resultUsuario = $stmtUsuario->get_result();

if ($resultUsuario->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Usuário não encontrado."
    ]);
    exit;
}

// Recupera os itens do carrinho
$stmt = $conn->prepare("SELECT idItem, quantidade, preco FROM tb_itens_pedido WHERE idUsuario = ? AND finalizado = 0");
$stmt->bind_param("i", $idUsuario);

if ($stmt) {
    $stmt->execute();
    $result = $stmt->get_result();

    $pedidos = []; // Array para armazenar os itens

    if ($result->num_rows > 0) {
        while ($item = $result->fetch_assoc()) {
            $pedidos[] = [
                "idItem" => $item['idItem'],
                "quantidade" => $item['quantidade'],
                "preco" => $item['preco']
            ];
        }

        echo json_encode([
            "status" => "success",
            "message" => "Itens recuperados com sucesso!",
            "pedidos" => $pedidos
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Nenhum item encontrado."
        ]);
    }

    $stmt->close();
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Erro ao preparar a consulta: " . $conn->error
    ]);
}

$conn->close();

?>
