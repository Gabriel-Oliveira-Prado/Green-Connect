<?php

header('Content-Type: application/json');

$servername = "localhost"; // Ou o IP do seu servidor de banco de dados
$username = "root"; // Seu usuário do MySQL
$password = ""; // Sua senha do MySQL
$dbname = "green_connect_db";

try {
    // Criar a conexão PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
    
    // Definir o modo de erro do PDO para exceção
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
    // Em caso de erro na conexão, retorna uma mensagem de erro em JSON
    echo json_encode(['success' => false, 'message' => 'Erro de conexão com o banco de dados: ' . $e->getMessage()]);
    exit(); // Encerra o script
}