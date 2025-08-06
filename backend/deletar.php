<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

$data = json_decode(file_get_contents("php://input"), true);
if (!$data || empty($data['id'])) {
    echo json_encode(["status" => "erro", "mensagem" => "ID obrigatório"]);
    exit();
}

$file = __DIR__ . '/data.json';
$list = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

$list = array_filter($list, fn($p) => $p['id'] !== $data['id']);

file_put_contents($file, json_encode(array_values($list), JSON_PRETTY_PRINT));
echo json_encode(["status" => "sucesso", "mensagem" => "Pessoa deletada"]);
