<?php
require_once "conexao.php"; // puxa $conn

session_start();
$idUsuario = $_SESSION['id_usuario'];

$cep    = $_POST["cep"] ?? "";
$rua    = $_POST["rua"] ?? "";
$bairro = $_POST["bairro"] ?? "";
$cidade = $_POST["cidade"] ?? "";
$uf     = $_POST["uf"] ?? "";

$sql = "INSERT INTO endereco_geral (CEP, rua, bairro, cidade, UF)
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $cep, $rua, $bairro, $cidade, $uf);

if ($stmt->execute()) {

    $idEndereco = $conn->insert_id;

    $sql2 = "UPDATE usuario SET endereco = ? WHERE id_usuario = ?";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("ii", $idEndereco, $idUsuario);
    $stmt2->execute();

    echo "Endereço cadastrado com sucesso!";

} else {

    echo "Erro ao cadastrar endereço: " . $stmt->error;

}
?>
