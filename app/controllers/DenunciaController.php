<?php

namespace App\Controllers;

include_once __DIR__ . '/../models/DenunciaModel.php';

use App\Models\DenunciaModel;

class DenunciaController {

    
    public static function index(){include_once('../views/denuncia.html');}
    public static function denunciartela(){include_once('../views/denunciar.html');}
    
    

    public static function denunciar()
    {
        if (isset($_POST)) {
            $tipo = $_POST['tipo'];
            $motivo = $_POST['motivo'];
            $descricao = $_POST['descricao'];
            $id = $_POST['id'];

            $model = new DenunciaModel;
            return $model->denunciar($id, $tipo, $motivo, $descricao);
        } else {
            return ["sucesso" => false, "message" => "Requisição POST incompleta"];
        }
    }

    public function revisar($id)
    {
        if (isset($id)) {
            $model = new DenunciaModel;
            return $model->revisarDenuncia($id);
        } else {
            return ["sucesso" => false, "message" => "Requisição GET incompleta"];
        }
    }

    public function deletar($id)
    {
        if (isset($id)) {
            $model = new DenunciaModel;
            return $model->deletarDenuncia($id);
        } else {
            return ["sucesso" => false, "message" => "Requisição GET incompleta"];
        }
    }

    public function listar($id = false)
    {
        $model = new DenunciaModel;
        return isset($id) ? $model->listarDenuncia($id) : $model->listarDenuncia();
    }
}