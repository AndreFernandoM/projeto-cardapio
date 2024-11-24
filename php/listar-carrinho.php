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
    echo json_encode(["status" => "error", "message" => "ID do usuário não fornecido."]);
    exit;
}

// Verifica se o usuário existe
$stmtUsuario = $conn->prepare("SELECT id FROM tb_usuario WHERE id = ?");
$stmtUsuario->bind_param("i", $idUsuario);
$stmtUsuario->execute();
$resultUsuario = $stmtUsuario->get_result();

if ($resultUsuario->num_rows == 0) {
    echo json_encode(["status" => "error", "message" => "Usuário não encontrado."]);
    exit;
}

// Busca itens do carrinho do usuário
$stmt = $conn->prepare("
    SELECT 
        i.id AS idItem, 
        i.nome AS name, 
        i.descricao AS description, 
        i.preco AS price, 
        i.foto AS foto, 
        ip.quantidade AS quantity
    FROM 
        tb_itens_pedido AS ip
    INNER JOIN 
        tb_itens AS i ON ip.idItem = i.id
    WHERE 
        ip.idUsuario = ? AND ip.finalizado = 0
");
$stmt->bind_param("i", $idUsuario);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $pedidos = [];

    while ($row = $result->fetch_assoc()) {
        $pedidos[] = [
            "idItem" => $row['idItem'],
            "name" => $row['name'],
            "description" => $row['description'],
            "price" => $row['price'],
            "foto" => $row['foto'],
            "quantity" => $row['quantity']
        ];
    }

    echo json_encode([
        "status" => "success",
        "pedidos" => $pedidos
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Erro ao buscar itens do carrinho: " . $conn->error
    ]);
}

$stmt->close();
$conn->close();
?>
