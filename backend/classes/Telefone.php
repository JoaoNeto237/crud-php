<?php
class Telefone {
    public $numero;
    public $descricao;

    public function __construct($data) {
        $this->numero = $data['numero'];
        $this->descricao = $data['descricao'];
    }
}
