<?php
namespace App\Controllers;

include_once __DIR__ . '/../models/ForumModel.php';
include_once __DIR__ . '/SessionController.php';

use App\Controllers\SessionController;
use App\Models\ForumModel;


class ForumController
{
    private $tabela = 'forum_tb';

    public static function forum(){include_once('../views/forum.html');}
    public static function forumEntrar(){include_once('../views/forum_entrar.html');}
    public static function forumComentario(){include_once('../views/comentario.html');}
    public static function forumDetalhes(){include_once('../views/forum_detalhes.html');}
    
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
            return $model->getForum($id);
        } else {
            return $model->getForum();
        }
    }

    public function getMembros($id = null)
    {
        $model = new ForumModel;
        if (isset($id)) {
            return $model->get(true, 'forum_usuario_tb', 'foruser_for_id', $id);
        } else {
            return ["sucesso" => false, "message" => "Requisição GET incompleta."];
        }
    }

    public function getUserForuns($id)
    {
        $model = new ForumModel;
        if (isset($id)) {
            return $model->getUserForuns($id);
        } else {
            return ["sucesso" => false, "message" => "Requisição GET incompleta."];
        }
    }

    public function getFullForum($id = null)
    {
        if (isset($id)) {
            $forum = $this->getForum($id);
            if (!$forum['sucesso']) {
                return $forum;
            }
            $membros = $this->getMembros($id);
            $result = ["forum" => $forum, "membros" => $membros['result']];
            return ["sucesso" => true, "result" => $result];
        } else {
            $foruns = $this->getForum();
            if (!$foruns['sucesso']) {
                return $foruns;
            }

            $result = [];
            foreach ($foruns['result'] as $forum) {
                $membros = $this->getMembros($forum['for_id']);
                $result[] = [
                    "forum" => $forum,
                    "membros" => $membros['result']
                ];
            }
            return ["sucesso" => true, "result" => $result];
        }
    }

    public function entrarForum($user, $forId)
    {
        if (isset($forId)) {
            $model = new ForumModel;
            $forum = $model->get(false, $this->tabela, 'for_id', $forId);
            if ($forum['sucesso']) {
                if ($this->validaPresencaForum($user, $forId)) {
                    return $model->entrarForum($user, $forId);
                } else {
                    return ["sucesso" => false, "message" => "Usuário já presente no fórum!"];
                }
            } else {
                return ["sucesso" => false, "message" => "Fórum inexistente!"];
            }
        } else {
            return ["sucesso" => false, "message" => "Requisição GET não realizada."];
        }
    }

    public function sairForum($user, $forId)
    {
        if (isset($forId)) {
            $model = new ForumModel;
            return $model->sairForum($user, $forId);
        } else {
            return ["sucesso" => false, "message" => "Requisição GET não realizada."];
        }
    }

    public function deletarForum($user, $forId)
    {
        if (isset($forId)) {
            if ($this->validaPresencaForum($user, $forId)) {
                $model = new ForumModel;
                return $model->deletarForum($forId);
            } else {
                return ["sucesso" => false, "message" => "Sem permissão para alterar fórum!"];
            }
        } else {
            return ["sucesso" => false, "message" => "Requisição GET incompleta."];
        }
    }

    public function validaPresencaForum($user, $forId)
    {
        $model = new ForumModel;
        return $model->getPresencaForum($user, $forId);
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
