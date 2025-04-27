<?php

class ForumModel
{
    private $conn;

    public function __construct()
    {
        require_once __DIR__ . '/../../config/DBConnection.php';
        $this->conn = DBConnection::getConnection();
    }

    public function salvar($titulo, $descricao)
    {
        $stmt = $this->conn->prepare('INSERT INTO forum_posts (titulo, descricao, criado_em) VALUES (?, ?, NOW())');
        $stmt->execute([$titulo, $descricao]);
    }
}
