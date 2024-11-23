<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

include 'conn.php';

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("SELECT c.id AS idCategoria, c.nome AS categoria, i.nome, i.descricao, i.preco, i.foto 
                        FROM tb_itens i
                        INNER JOIN tb_categoria c ON i.idCategoria = c.id");

if ($stmt) {
    $stmt->execute();
    $result = $stmt->get_result();

    $categories = []; 

    if ($result->num_rows > 0) {
        while ($item = $result->fetch_assoc()) {
            $idCategoria = $item['idCategoria'];
            $categoriaNome = $item['categoria'];

            if (!isset($categories[$idCategoria])) {
                $categories[$idCategoria] = [
                    "idCategoria" => $idCategoria,
                    "name" => $categoriaNome,
                    "items" => []
                ];
            }

            $categories[$idCategoria]["items"][] = [
                "name" => $item['nome'],
                "description" => $item['descricao'],
                "foto" => $item['foto'],
                "price" => $item['preco']
            ];
        }

        echo json_encode([
            "status" => "success",
            "message" => "Itens recuperados com sucesso!",
            "categories" => array_values($categories) 
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
