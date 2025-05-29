<?php
namespace App\Controllers;

include_once __DIR__ . '/../models/ComentarioModel.php';
include_once __DIR__ . '/SessionController.php';

use App\Controllers\SessionController;
use App\Models\ComentarioModel;


class ComentarioController
{
    private $tabela = 'comentarios_tb';
    
    public function criarComentario($user) {
        if (isset($_POST)) {
            // texto do comentario e ID do post
            $comentario = $_POST['comentario'];
            $id = $_POST['id'];

            $model = new ComentarioModel;
            return $model->criarComentario($user, $comentario, $id);
        } else {
            return ["sucesso" => false, "message" => "Requisição POST não realizada."];
        }
    }

    public function alterarComentario($user) {
        if (isset($_POST)) {
            $id = $_POST['id'];
            $comentario = $_POST['comentario'];
            if ($this->validaPermissaoComentario($user, $id)) {
                $model = new ComentarioModel;
                return $model->alterarComentario($id, $comentario);
            } else {
                return ["sucesso" => false, "message" => "Sem permissão para alterar comentário!"];
            }
        } else {
            return ["sucesso" => false, "message" => "Requisição POST não realizada."];
        }
    }

    public function deletarComentario($user, $comId)
    {
        if (isset($comId)) {
            if ($this->validaPermissaoComentario($user, $comId)) {
                $model = new ComentarioModel;
                return $model->deletarComentario($comId);
            } else {
                return ["sucesso" => false, "message" => "Sem permissão para alterar comentário!"];
            }
        } else {
            return ["sucesso" => false, "message" => "Requisição GET incompleta."];
        }
    }

    public function getPostComentarios($posId)
    {
        if (isset($posId)) {
            $model = new ComentarioModel;
            return $model->getPostComentarios($posId);
        } else {
            return ["sucesso" => false, "message" => "Requisição GET incompleta."];
        }
    }

    public function validaPermissaoComentario($user, $comId) {
        $model = new ComentarioModel;
        $forum = $model->get(false, $this->tabela, 'com_id', $comId);
        if ($forum['sucesso']) {
            if ($forum['result']['com_user_id'] == $user['id'] || $user['admin'] > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
