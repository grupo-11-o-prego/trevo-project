<?php

namespace App\Controllers;

include_once __DIR__ . '/../models/PerfilModel.php';

use App\Models\PerfilModel;

class PerfilController {

    public static function perfil()
    {
        include_once('../views/perfil.html');
    }

    public function getPerfil ($user) {
        if (isset($user)) {
            $model = new PerfilModel();
            $result = $model->getPerfil($user);

            if ($result['sucesso']) {
                return $result;
            } else {
                return null;
            }
        }
    }

}