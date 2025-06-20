<?php

namespace App\Controllers;

include_once __DIR__ . '/../models/AnuncioModel.php';

use App\Models\AnuncioModel;

class AnuncioController {
    private $tabela = 'anuncios_tb';
    public function anuncio() { include_once('../views/anuncio.html');}

    public function anuncioAtualizar() { include_once('../views/anuncio_atualizar.html');}

    public function anuncioDetalhes() { include_once('../views/anuncio_detalhe.html');}

    public function viewAlterarTitulo() { include_once('../views/crud-anuncio/alterartitulo.html'); }

    public function viewAlterarDescricao() { include_once('../views/crud-anuncio/alterardescricao.html'); }

    public function viewAlterarPreco() { include_once('../views/crud-anuncio/alterarPreco.html'); }

    public function getAnuncio($get){
        $model = new AnuncioModel;

        if (isset($get['id'])) {
            $result = $model->get(false, $this->tabela, 'anun_id', $get['id']);
        } else if (isset($get['titulo'])) {
            $result = $model->get(false, $this->tabela, 'anun_titulo', $get['titulo']);
        } else {
            $result = $model->get(true, $this->tabela);
        }

        return $result;
    }

    public function criarAnuncio($id){
        if (isset($_POST)) {
            $titulo = $_POST['titulo'];
            $descricao = $_POST['descricao'];
            $tipo = $_POST['tipo'];
            $preco = $_POST['preco'];
            $estado = $_POST['estado'];
            
            $model = new AnuncioModel;
            return $model->criarAnuncio($id, $titulo, $descricao, $tipo, $preco, $estado);
        } else {
            return ['sucesso' => false, 'message' => 'Requisição POST nao realizada.'];
        }
    }

    public function deletarAnuncio($id, $user){
        if (isset($id)) {
            if ($this->validaPermissaoAnuncio($user, $id)) {
                $anuncio = new AnuncioModel;
                return $anuncio->deletarAnuncio($id, $user);
            } else {
                return ["sucesso" => false, "message" => "Sem persmissão para editar anúncio!"];
            }
        } else {
            return ['sucesso' => false, 'message' => 'ID do anúncio não enviado.'];
        }
    }

    public function alterarTitulo($user)
    {
        if (isset($_POST)) {
            $id = $_POST['id'];
            $titulo = $_POST['titulo'];
            if ($this->validaPermissaoAnuncio($user, $id)) {
                $model = new AnuncioModel;
                return $model->alterarTitulo($id, $titulo, $user);
            } else {
                return ["sucesso" => false, "message" => "Sem persmissão para editar anúncio!"];
            }
        } else {
            echo json_encode(['sucesso' => false, 'error' => 'Requisicao POST nao realizada.']);
        }
    }

    public function alterarDescricao($user)
    {
        if (isset($_POST)) {
            $id = $_POST['id'];
            $descricao = $_POST['descricao'];
            if ($this->validaPermissaoAnuncio($user, $id)) {
                $model = new AnuncioModel;
                return $model->alterarDescricao($id, $descricao, $user);
            } else {
                return ["sucesso" => false, "message" => "Sem persmissão para editar anúncio!"];
            }
        } else {
            echo json_encode(['sucesso' => false, 'error' => 'Requisicao POST nao realizada.']);
        }
    }

    public function alterarPreco($user)
    {
        if (isset($_POST)) {
            $id = $_POST['id'];
            $preco = $_POST['preco'];
            if ($this->validaPermissaoAnuncio($user, $id)) {
                $model = new AnuncioModel;
                return $model->alterarPreco($id, $preco, $user);
            } else {
                return ["sucesso" => false, "message" => "Sem persmissão para editar anúncio!"];
            }
        } else {
            echo json_encode(['sucesso' => false, 'error' => 'Requisicao POST nao realizada.']);
        }
    }

    public function alterarStatus($user)
    {
        if (isset($_POST)) {
            $id = $_POST['id'];
            $status = $_POST['status'];
            if ($this->validaPermissaoAnuncio($user, $id)) {
                $model = new AnuncioModel;
                return $model->alterarStatus($id, $status, $user);
            } else {
                return ["sucesso" => false, "message" => "Sem persmissão para editar anúncio!"];
            }
        } else {
            return ['sucesso' => false, 'error' => 'Requisicao POST nao realizada.'];
        }
    }

    public function alterarTipo($user)
    {
        if (isset($_POST)) {
            $id = $_POST['id'];
            $tipo = $_POST['tipo'];
            if ($this->validaPermissaoAnuncio($user, $id)) {
                $model = new AnuncioModel;
                return $model->alterarTipo($id, $tipo);
            } else {
                return ["sucesso" => false, "message" => "Sem persmissão para editar anúncio!"];
            }
        } else {
            return ['sucesso' => false, 'error' => 'Requisicao POST nao realizada.'];
        }
    }

    public function alterarEstado($user)
    {
        if (isset($_POST)) {
            $id = $_POST['id'];
            $estado = $_POST['estado'];
            if ($this->validaPermissaoAnuncio($user, $id)) {
                $model = new AnuncioModel;
                return $model->alterarEstado($id, $estado, $user);
            } else {
                return ["sucesso" => false, "message" => "Sem persmissão para editar anúncio!"];
            }
        } else {
            echo json_encode(['sucesso' => false, 'error' => 'Requisicao POST nao realizada.']);
        }
    }

    public function listar($id = false)
    {
        $model = new AnuncioModel;
        return isset($id) ? $model->listar($id) : $model->listar();
    }

    public function validaPermissaoAnuncio($user, $idAnun){
        $model = new AnuncioModel;
        $anuncio = $model->get(false, $this->tabela, 'anun_id', $idAnun);
        // verifica se quem está deletando o anúncio é o usuário que o criou ou se é administrador
        if ($anuncio['result']['anun_user_id'] == $user['id'] || $user['admin'] > 0) {
            return true;
        } else {
            return false;
        }
    }

}