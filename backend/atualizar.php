<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once __DIR__ . '/classes/Pessoa.php';

$data = json_decode(file_get_contents("php://input"), true);
if (!$data || empty($data['id'])) {
    echo json_encode(["status" => "erro", "mensagem" => "ID obrigatório"]);
    exit();
}

$file = __DIR__ . '/data.json';
$list = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

foreach ($list as &$pessoa) {
    if ($pessoa['id'] === $data['id']) {
        $data['id'] = $pessoa['id']; 
        $pessoa = $data;
        file_put_contents($file, json_encode($list, JSON_PRETTY_PRINT));
        echo json_encode(["status" => "sucesso", "mensagem" => "Pessoa atualizada"]);
        exit();
    }
}

echo json_encode(["status" => "erro", "mensagem" => "Pessoa não encontrada"]);
