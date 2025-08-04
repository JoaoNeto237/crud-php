<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

require_once '../classes/Pessoa.php';
require_once '../classes/Telefone.php';
require_once '../db.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

switch ($method) {
    case 'GET':
        echo json_encode($db);
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $pessoa = new Pessoa($input);

        // Telefones
        if(isset($input['telefones'])){
            foreach($input['telefones'] as $t){
                $pessoa->telefones[] = new Telefone($t);
            }
        }

        $db[] = $pessoa;
        saveDB($db);
        echo json_encode(["message" => "Pessoa cadastrada com sucesso!", "id" => $pessoa->id]);
        break;

    case 'DELETE':
        parse_str($_SERVER['QUERY_STRING'], $query);
        $id = $query['id'] ?? null;

        if($id){
            $db = array_filter($db, fn($p) => $p['id'] != $id);
            saveDB(array_values($db));
            echo json_encode(["message" => "Pessoa removida com sucesso!"]);
        } else {
            echo json_encode(["error" => "ID não informado"]);
        }
        break;
}
