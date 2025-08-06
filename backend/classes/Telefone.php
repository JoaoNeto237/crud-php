<?php
class Telefone {
    public $telefone;
    public $descricao;

    public function __construct($dados) {
        // Mantém apenas dígitos e parênteses no telefone
        $this->telefone = preg_replace('/[^\d\(\)]/', '', $dados['telefone']);
        $this->descricao = $dados['descricao'];
    }

    public function toArray() {
        return [
            "telefone" => $this->telefone,
            "descricao" => $this->descricao
        ];
    }
}
