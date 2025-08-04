<?php
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

    public function __construct($data) {
        $this->id = uniqid(); // Gera ID único
        $this->nome = $data['nome'];
        $this->cpf = $data['cpf'];
        $this->rg = $data['rg'];
        $this->cep = $data['cep'];
        $this->logradouro = $data['logradouro'];
        $this->complemento = $data['complemento'];
        $this->setor = $data['setor'];
        $this->cidade = $data['cidade'];
        $this->uf = $data['uf'];
    }
}
