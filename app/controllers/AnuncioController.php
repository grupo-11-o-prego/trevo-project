<?php

namespace App\Controllers;

include_once __DIR__ . '/../models/AnuncioModel.php';

use App\Models\AnuncioModel;

class AnuncioController {
    private $tabela = 'anuncios_tb';
    public function anuncio() { include_once('../views/anuncio.html');}

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

    public function criarAnuncio(){
        $titulo = $_POST['titulo'];
        $descricao = $_POST['descricao'];
        $preco = $_POST['preco'];
        $id = 6;
        
        $model = new AnuncioModel;
        $result = $model->criarAnuncio($id, $titulo, $descricao, $preco);
        return $result;
    }

    // public function deletarAnuncio($id)
    // {
    //     $anuncio = new AnuncioModel;

    //     $result = $anuncio->deletarAnuncio($id);

    //     if ($result) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    public function alterarTitulo()
    {
        $id = $_POST['id'];
        $titulo = $_POST['titulo'];
        $model = new AnuncioModel;
        $result = $model->alterarTitulo($id, $titulo);
        return $result;
    }

    public function  alterarDescricao()
    {
        $id = $_POST['id'];
        $descricao = $_POST['descricao'];
        $model = new AnuncioModel;
        $result = $model->alterarDescricao($id, $descricao);
        return $result;
    }

    public function  alterarPreco()
    {
        $id = $_POST['id'];
        $preco = $_POST['preco'];
        $model = new AnuncioModel;
        $result = $model->alterarPreco($id, $preco);
        return $result;
    }

    public function listar($id = false)
    {
        $model = new AnuncioModel;
        if ($id) {
            $result = $model->listar($id);
        }else {    
            $result = $model->listar();
        }

        return $result;
    }

}