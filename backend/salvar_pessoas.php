<?php
header("Access-Control-Allow-Origin: *"); // permite requisições do React
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Caminho do arquivo JSON
$arquivo = "data.json";

// Lê o corpo da requisição
$dadosJson = file_get_contents("php://input");
$dados = json_decode($dadosJson, true);

if (!$dados) {
    echo json_encode(["status" => "erro", "mensagem" => "JSON inválido"]);
    exit;
}

// Lê dados existentes
$registros = [];
if (file_exists($arquivo)) {
    $conteudo = file_get_contents($arquivo);
    $registros = json_decode($conteudo, true) ?? [];
}

// Adiciona novo registro
$registros[] = $dados;

// Salva no arquivo JSON
file_put_contents($arquivo, json_encode($registros, JSON_PRETTY_PRINT));

// Retorna resposta
echo json_encode(["status" => "sucesso", "mensagem" => "Pessoa salva com sucesso!"]);
