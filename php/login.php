<?php

session_start();

require 'db_connect.php';

$response = ['success' => false, 'message' => 'Email ou senha inválidos.'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? null;
    $senha = $_POST['password'] ?? null;

    if ($email && $senha) {
        $stmt = $conn->prepare("SELECT u.id_usuario, u.email, u.senha, u.tipo_usuario, c.nome_completo, e.razao_social 
                                FROM usuario u
                                LEFT JOIN cidadao c ON u.id_usuario = c.id_cidadao
                                LEFT JOIN empresa e ON u.id_usuario = e.id_empresa
                                WHERE u.email = :email");
        $stmt->execute([':email' => $email]);
        
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario) {
            if (password_verify($senha, $usuario['senha'])) {
                $_SESSION['user_id'] = $usuario['id_usuario'];
                $_SESSION['user_type'] = $usuario['tipo_usuario'];
                if ($usuario['tipo_usuario'] === 'fisica') {
                    $_SESSION['user_name'] = $usuario['nome_completo'];
                } else {
                    $_SESSION['user_name'] = $usuario['razao_social'];
                }

                $response = ['success' => true, 'message' => 'Login realizado com sucesso!'];
            } else {
                $response['message'] = 'Senha incorreta.';
            }
        } else {
            $response['message'] = 'Email não encontrado.';
        }
    }
}

echo json_encode($response);

$conn = null;
?>