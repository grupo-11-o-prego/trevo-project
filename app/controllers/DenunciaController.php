<?php

namespace App\Controllers;

include_once __DIR__ . '/../models/DenunciaModel.php';

use App\Models\DenunciaModel;

class DenunciaController {

    
    public static function index()
    {
        include_once('../views/denuncia.html');
    }

    public static function denunciar($params)
    {
        if (isset($params['tipo']) && isset($params['id'])) {
            $model = new DenunciaModel;
            return $model->denunciar($params['id'], $params['tipo']);
        } else {
            return ["sucesso" => false, "message" => "Requisição GET incompleta"];
        }
    }

    public function revisar($id)
    {
        $model = new DenunciaModel;

        $result = $model->revisarDenuncia($id);

        if($result){
            return true;
        } else {
            return false;
        }
    }

    public function deletar($id)
    {
        $model = new DenunciaModel;
        
        $result = $model->deletarDenuncia($id);

        if($result){
            return true;
        } else {
            return false;
        }
    }

    public function listar($id = false)
    {
        $model = new DenunciaModel;
        if ($id) {
            $result = $model->listarDenuncia($id);
        } else {
            $result = $model->listarDenuncia();
        }
        return $result;
    }
}