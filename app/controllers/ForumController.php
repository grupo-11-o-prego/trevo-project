<?php
namespace App\Controllers;

include_once __DIR__ . '/../models/ForumModel.php';
include_once __DIR__ . '/SessionController.php';

use App\Controllers\SessionController;
use App\Models\ForumModel;


class ForumController
{
    public function criarForum($user) {
        if (isset($_POST)) {
            $titulo = $_POST['titulo'];
            $descricao = $_POST['descricao'];
            $tema = $_POST['tema'];

            $model = new ForumModel;
            return $model->criarForum($user, $titulo, $descricao, $tema);
        } else {
            return ["sucesso" => false, "message" => "Requisição POST não realizada."];
        }
    }
}
