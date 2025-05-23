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

    public function alterarTitulo($user) {
        if (isset($_POST)) {
            $id = $_POST['id'];
            $titulo = $_POST['titulo'];
            if ($this->validaPermissaoForum($user, $id)) {
                $model = new ForumModel;
                return $model->alterarTitulo($user, $id, $titulo);
            } else {
                return ["sucesso" => false, "message" => "Sem permissão para alterar fórum"];
            }
        } else {
            return ["sucesso" => false, "message" => "Requisição POST não realizada."];
        }
    }

    public function validaPermissaoForum($user, $forId) {
        $model = new ForumModel;
        $forum = $model->get(false, 'forum_tb', 'for_id', $forId);
        
        if ($forum['result']['for_criador_user_id'] == $user['id'] || $user['admin'] > 0) {
            return true;
        } else {
            return false;
        }
    }
}
