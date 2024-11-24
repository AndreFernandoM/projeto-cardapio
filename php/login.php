<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

include 'conn.php';

$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data['email'] ?? '');
$senha = trim($data['senha'] ?? '');

if (!empty($email) && !empty($senha)) {
    $stmt = $conn->prepare("SELECT * FROM tb_usuario WHERE email = ? AND senha = SHA2(?, 256)");
    
    if ($stmt) {
        $stmt->bind_param("ss", $email, $senha);
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            // Login bem-sucedido
            $user = $result->fetch_assoc();
            echo json_encode([
                "status" => "success",
                "message" => "Login realizado com sucesso!",
                "user" => [
                    "nome" => $user['nome'],
                    "email" => $user['email'],
                    "id" => $user['id'],
                ]
            ]);
        } else {
            // Credenciais inválidas
            echo json_encode([
                "status" => "error",
                "message" => "Email ou senha inválidos."
            ]);
        }
        
        $stmt->close();
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Erro ao preparar a consulta: " . $conn->error
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Por favor, preencha todos os campos."
    ]);
}

$conn->close();
?>
