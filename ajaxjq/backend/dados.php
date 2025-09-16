<?php
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);

if ($input) {
  $nome = htmlspecialchars($input["nome"]);
  $sobrenome = htmlspecialchars($input["sobrenome"]);
  $email = htmlspecialchars($input["email"]);
  $cpf = htmlspecialchars($input["cpf"]);
  $cidade = htmlspecialchars($input["cidade"]);
  $estado = htmlspecialchars($input["estado"]);

  echo json_encode([
    "status" => "sucesso",
    "mensagem" => "Dados recebidos com sucesso",
    "dados" => $input
  ]);
} else {
  echo json_encode([
    "status" => "erro",
    "mensagem" => "Nenhum dado recebido"
  ]);
}
?>