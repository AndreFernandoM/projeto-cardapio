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

$nome = trim($data['nome'] ?? '');
$email = trim($data['email'] ?? '');
$data_nascimento = $data['dataNascimento'] ?? '';
$telefone = trim($data['telefone'] ?? '');
$senha = trim($data['senha'] ?? '');
$confirmarSenha = trim($data['confirmarSenha'] ?? '');
$cep = trim($data['cep'] ?? '');
$rua = trim($data['rua'] ?? '');
$numero = trim($data['numero'] ?? '');
$bairro = trim($data['bairro'] ?? '');
$complemento = trim($data['complemento'] ?? '');
$cidade = trim($data['cidade'] ?? '');
$estado = trim($data['estado'] ?? '');

if (empty($nome) || empty($email) || empty($senha)) {
    echo "Por favor, preencha todos os campos corretamente.";
    exit;
}

$stmt = $conn->prepare("INSERT INTO tb_usuario (nome, email, data_nascimento, telefone, senha, cep, rua, numero, bairro, complemento, cidade, estado) VALUES (?, ?, ?, ?,  SHA2(?, 256), ?, ?, ?, ?, ?, ?, ?)");

if ($stmt) {
    $stmt->bind_param("ssssssssssss", $nome, $email, $data_nascimento, $telefone, $senha, $cep, $rua, $numero, $bairro, $complemento, $cidade, $estado);

    if ($stmt->execute()) {
        echo "Novo usuário inserido com sucesso!";
    } else {
        echo "Erro ao inserir usuário: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Erro ao preparar a declaração SQL: " . $conn->error;
}

$conn->close();
?>
