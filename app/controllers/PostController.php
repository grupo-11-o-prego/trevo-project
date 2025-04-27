<?php
namespace App\Controllers;

use App\Models\PostModel;

class PostController
{
    public function form()
    {
        include_once __DIR__ . '/../../views/create-post.html';
    }

    public function cadastrar()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $titulo = $_POST['titulo'] ?? '';
            $conteudo = $_POST['conteudo'] ?? '';

            require_once __DIR__ . '/../models/PostModel.php';

            $postModel = new PostModel();
            $postModel->salvar($titulo, $conteudo);

            header('Location: ' . getenv('BASE_URL') . '/');
            exit;
        }
    }
}
