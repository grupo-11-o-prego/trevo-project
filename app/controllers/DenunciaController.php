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