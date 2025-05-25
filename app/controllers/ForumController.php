<?php
namespace App\Controllers;

include_once __DIR__ . '/../models/ForumModel.php';
include_once __DIR__ . '/SessionController.php';

use App\Controllers\SessionController;
use App\Models\ForumModel;


class ForumController
{
    private $tabela = 'forum_tb';

    public static function forum()
    {
        include_once('../views/forum.html');
    }

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
                return $model->alterarTitulo($id, $titulo);
            } else {
                return ["sucesso" => false, "message" => "Sem permissão para alterar fórum"];
            }
        } else {
            return ["sucesso" => false, "message" => "Requisição POST não realizada."];
        }
    }

    public function alterarDescricao($user) {
        if (isset($_POST)) {
            $id = $_POST['id'];
            $titulo = $_POST['descricao'];
            if ($this->validaPermissaoForum($user, $id)) {
                $model = new ForumModel;
                return $model->alterarDescricao($id, $titulo);
            } else {
                return ["sucesso" => false, "message" => "Sem permissão para alterar fórum"];
            }
        } else {
            return ["sucesso" => false, "message" => "Requisição POST não realizada."];
        }
    }

    public function alterarTema($user) {
        if (isset($_POST)) {
            $id = $_POST['id'];
            $titulo = $_POST['tema'];
            if ($this->validaPermissaoForum($user, $id)) {
                $model = new ForumModel;
                return $model->alterarTema($id, $titulo);
            } else {
                return ["sucesso" => false, "message" => "Sem permissão para alterar fórum"];
            }
        } else {
            return ["sucesso" => false, "message" => "Requisição POST não realizada."];
        }
    }
    
    public function getForum($id = null)
    {
        $model = new ForumModel;
        if (isset($id)) {
            return $model->get(false, $this->tabela, 'for_id', $id);
        } else {
            return $model->get(true, $this->tabela);
        }
    }

    public function validaPermissaoForum($user, $forId) {
        $model = new ForumModel;
        $forum = $model->get(false, 'forum_tb', 'for_id', $forId);
        if ($forum['sucesso']) {
            if ($forum['result']['for_criador_user_id'] == $user['id'] || $user['admin'] > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
