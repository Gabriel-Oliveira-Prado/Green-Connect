<?php
require_once "conexao.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $tipo = $_POST["tipo"] ?? "";

    if ($tipo === "fisica") {
        $nome = $_POST["nome"];
        $username = $_POST["username"];
        $email = $_POST["email"];
        $senha = password_hash($_POST["senha"], PASSWORD_DEFAULT);
        $endereco = $_POST["endereco"];

        $sql = "INSERT INTO usuarios (tipo, nome_completo, username, email, senha, endereco)
                VALUES ('fisica', ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssss", $nome, $username, $email, $senha, $endereco);

        if ($stmt->execute()) {
            echo "ok-fisica";
        } else {
            echo "erro";
        }

        $stmt->close();
    }

    if ($tipo === "juridica") {
        $razao = $_POST["razao_social"];
        $cnpj = $_POST["cnpj"];
        $email = $_POST["email"];
        $senha = password_hash($_POST["senha"], PASSWORD_DEFAULT);
        $endereco = $_POST["endereco"];

        $sql = "INSERT INTO usuarios (tipo, razao_social, cnpj, email, senha, endereco)
                VALUES ('juridica', ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", $razao, $cnpj, $email, $senha, $endereco);

        if ($stmt->execute()) {
            echo "ok-juridica";
        } else {
            echo "erro";
        }

        $stmt->close();
    }
}
?>
