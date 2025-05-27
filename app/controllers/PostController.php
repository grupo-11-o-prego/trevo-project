<?php
namespace App\Controllers;

include_once __DIR__ . '/../models/PostModel.php';
include_once __DIR__ . '/SessionController.php';

use App\Controllers\SessionController;
use App\Models\PostModel;


class PostController
{
    private $tabela = 'posts_tb';
    
    public function criarPost($user) {
        if (isset($_POST)) {
            // texto do post e ID do fórum
            $texto = $_POST['texto'];
            $id = $_POST['id'];

            $model = new PostModel;
            return $model->criarPost($user, $texto, $id);
        } else {
            return ["sucesso" => false, "message" => "Requisição POST não realizada."];
        }
    }

    public function alterarTexto($user) {
        if (isset($_POST)) {
            $id = $_POST['id'];
            $texto = $_POST['texto'];
            if ($this->validaPermissaoPost($user, $id)) {
                $model = new PostModel;
                return $model->alterarTexto($id, $texto);
            } else {
                return ["sucesso" => false, "message" => "Sem permissão para alterar post!"];
            }
        } else {
            return ["sucesso" => false, "message" => "Requisição POST não realizada."];
        }
    }

    public function validaPermissaoPost($user, $posId) {
        $model = new PostModel;
        $forum = $model->get(false, $this->tabela, 'pos_id', $posId);
        if ($forum['sucesso']) {
            if ($forum['result']['pos_user_id'] == $user['id'] || $user['admin'] > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
