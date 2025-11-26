<?php
session_start();
require 'db_connect.php';

$response = ['success' => false, 'message' => 'Dados inválidos.'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tipo = $_POST['tipo'] ?? null;

    try {
        $conn->beginTransaction();

        if ($tipo === 'fisica') {
            $nome = $_POST['nome'] ?? null;
            $username = $_POST['username'] ?? null;
            $email = $_POST['email'] ?? null;
            $senha = $_POST['password'] ?? null;

            if ($nome && $username && $email && $senha) {
                $stmt = $conn->prepare("SELECT id_usuario FROM usuario WHERE email = :email");
                $stmt->execute([':email' => $email]);
                if ($stmt->rowCount() > 0) {
                    $response['message'] = 'Email já cadastrado.';
                } else {
                    $stmt = $conn->prepare("SELECT id_usuario FROM usuario WHERE username = :username");
                    $stmt->execute([':username' => $username]);
                    if ($stmt->rowCount() > 0) {
                        $response['message'] = 'Nome de usuário já cadastrado.';
                    } else {
                        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
                        $stmt = $conn->prepare("INSERT INTO usuario (username, email, senha, tipo_usuario) VALUES (:username, :email, :senha, 'fisica')");
                        $stmt->execute([':username' => $username, ':email' => $email, ':senha' => $senhaHash]);
                        $userId = $conn->lastInsertId();

                        $stmt = $conn->prepare("INSERT INTO cidadao (id_cidadao, nome_completo) VALUES (:id_cidadao, :nome_completo)");
                        $stmt->execute([':id_cidadao' => $userId, ':nome_completo' => $nome]);
                        
                        $conn->commit();

                        $_SESSION['user_id'] = $userId;
                        $_SESSION['user_name'] = $nome;
                        $_SESSION['user_type'] = 'fisica';

                        $response = ['success' => true, 'message' => 'Cadastro realizado com sucesso!', 'redirect' => 'assets/View/dashboard.html'];
                    }
                }
            }
        } elseif ($tipo === 'juridica') {
            $razaoSocial = $_POST['razao_social'] ?? null;
            $cnpj = $_POST['cnpj'] ?? null;
            $email = $_POST['email'] ?? null;
            $senha = $_POST['password'] ?? null;

            if ($razaoSocial && $cnpj && $email && $senha) {
                $stmt = $conn->prepare("SELECT id_usuario FROM usuario WHERE email = :email");
                $stmt->execute([':email' => $email]);

                if ($stmt->rowCount() > 0) {
                    $response['message'] = 'Email já cadastrado.';
                } else {
                    $stmt = $conn->prepare("SELECT id_empresa FROM empresa WHERE cnpj = :cnpj");
                    $stmt->execute([':cnpj' => $cnpj]);
                    if ($stmt->rowCount() > 0) {
                        $response['message'] = 'CNPJ já cadastrado.';
                    } else {
                        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
                        $stmt = $conn->prepare("INSERT INTO usuario (email, senha, tipo_usuario) VALUES (:email, :senha, 'juridica')");
                        $stmt->execute([':email' => $email, ':senha' => $senhaHash]);
                        $userId = $conn->lastInsertId();

                        $stmt = $conn->prepare("INSERT INTO empresa (id_empresa, razao_social, cnpj) VALUES (:id_empresa, :razao_social, :cnpj)");
                        $stmt->execute([':id_empresa' => $userId, ':razao_social' => $razaoSocial, ':cnpj' => $cnpj]);

                        $conn->commit();

                        $_SESSION['user_id'] = $userId;
                        $_SESSION['user_name'] = $razaoSocial;
                        $_SESSION['user_type'] = 'juridica';

                        $response = ['success' => true, 'message' => 'Cadastro realizado com sucesso!', 'redirect' => 'assets/View/dashboard.html'];
                    }
                }
            }
        }
    } catch (PDOException $e) {
        $conn->rollBack();
        $response['message'] = 'Erro no cadastro: ' . $e->getMessage();
    }
}

echo json_encode($response);

$conn = null;
?>