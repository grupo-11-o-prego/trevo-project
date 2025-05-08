<?php

namespace App\Models;

include_once __DIR__ . '/../../database/TimeStamp.php';
include_once __DIR__ . '/Model.php';

use Database\TimeStamp;
use App\Models\Model;

class PerfilModel extends Model {

    public function getPerfil($user) {
        try{
            // Pega o Hash da senha a partir do e-mail digitado.
            $stmt = $this->conn->prepare("SELECT * FROM usuarios_tb WHERE user_id = :id");
            $stmt->bindParam(':id', $user);

            $stmt->execute();
            $user = $stmt->fetch(\PDO::FETCH_ASSOC);

            if ($user) {
                return ['sucesso' => true, 'result' => $user];
            } else {
                return ['sucesso' => false, 'message' => 'Nao foi encontrado o usuario.'];
            }

            return false;

        } catch (\Exception $e) {
            return ['sucesso' => false, "message" => 'Erro ao buscar usuario: ' . $e->getMessage()];
        }
    }
    
}
