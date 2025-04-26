<?php
namespace App\Models;

include_once __DIR__ . '/Model.php';

class PostModel extends Model
{
    public function salvar($titulo, $conteudo)
    {
        $stmt = $this->conn->prepare("INSERT INTO forum_posts (titulo, conteudo, criado_em) VALUES (?, ?, NOW())");
        return $stmt->execute([$titulo, $conteudo]);
    }
}
