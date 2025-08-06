<?php
require_once __DIR__ . '/Telefone.php';

class Pessoa {
    public $id;
    public $nome;
    public $cpf;
    public $rg;
    public $cep;
    public $logradouro;
    public $complemento;
    public $setor;
    public $cidade;
    public $uf;
    public $telefones = [];

    public function __construct($dados) {
        $this->id = $dados['id'] ?? uniqid();
        $this->nome = $dados['nome'];
        $this->cpf = preg_replace('/\D/', '', $dados['cpf']);
        $this->rg = preg_replace('/\D/', '', $dados['rg']);
        $this->cep = $dados['cep'];
        $this->logradouro = $dados['logradouro'];
        $this->complemento = $dados['complemento'];
        $this->setor = $dados['setor'];
        $this->cidade = $dados['cidade'];
        $this->uf = strtoupper($dados['uf']);

        if (!empty($dados['telefones'])) {
            foreach ($dados['telefones'] as $tel) {
                $this->telefones[] = new Telefone($tel);
            }
        }
    }

    public function toArray() {
        return [
            "id" => $this->id,
            "nome" => $this->nome,
            "cpf" => $this->cpf,
            "rg" => $this->rg,
            "cep" => $this->cep,
            "logradouro" => $this->logradouro,
            "complemento" => $this->complemento,
            "setor" => $this->setor,
            "cidade" => $this->cidade,
            "uf" => $this->uf,
            "telefones" => array_map(fn($t) => $t->toArray(), $this->telefones)
        ];
    }
}
