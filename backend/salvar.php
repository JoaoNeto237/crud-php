<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once __DIR__ . '/classes/Pessoa.php';

$file = __DIR__ . '/data.json';
if (!file_exists($file)) file_put_contents($file, json_encode([]));

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["status" => "erro", "mensagem" => "JSON inválido"]);
    exit;
}

function validarCampos($data) {
    if (!preg_match('/^\d{11}$/', preg_replace('/\D/', '', $data['cpf'])))
        return "CPF deve ter exatamente 11 dígitos numéricos.";
    
    if (!preg_match('/^\d{7,9}$/', preg_replace('/\D/', '', $data['rg'])))
        return "RG deve ter entre 7 e 9 dígitos numéricos.";
    
    if (!preg_match('/^\d{5}-?\d{3}$/', $data['cep']))
        return "CEP inválido. Use 74912-261 ou 74912261.";

    foreach ($data['telefones'] as $tel) {
        if (!preg_match('/^\(?\d{2}\)?\d{8,9}$/', preg_replace('/[\s\-]/', '', $tel['telefone'])))
            return "Telefone inválido. Use (64)992549784 ou similar.";
    }
    return true;
}

$validacao = validarCampos($data);
if ($validacao !== true) {
    echo json_encode(["status" => "erro", "mensagem" => $validacao]);
    exit;
}

$dados = json_decode(file_get_contents($file), true);

$pessoa = new Pessoa($data);
$dados[] = $pessoa->toArray();

file_put_contents($file, json_encode($dados, JSON_PRETTY_PRINT));

echo json_encode(["status" => "sucesso", "mensagem" => "Pessoa cadastrada com sucesso!"]);
