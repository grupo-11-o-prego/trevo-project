<?php

namespace App\Models;

include_once __DIR__ . '/../../config/DBConnection.php';
include_once __DIR__ . '/../../database/TimeStamp.php';
include_once __DIR__ . '/Model.php';

use App\Models\Model;
use Config\DBConnection;
use Database\TimeStamp;

class DenunciaModel extends Model {

    public function denunciar($id, $tipo)
    {
       try{
            if ($tipo == 'user') {
                $stmt = $this->conn->prepare("INSERT INTO denuncias_tb (den_data, den_user_id) VALUES (now(), :id)");
            } else if ($tipo = 'anun') {
                $stmt = $this->conn->prepare("INSERT INTO denuncias_tb (den_data, den_anun_id) VALUES (now(), :id)");
            } else {
                return ["sucesso" => false, "message" => "Tipo inválido."];
            }
            $stmt->bindParam(":id", $id);
            $result = $stmt->execute();

            return $result ? ["sucesso" => true, "message" => "Denúncia realizada!"] : ["sucesso" => false, "message" => "Ocorreu um erro ao denunciar!"];

        }  catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function revisarDenuncia($id)
    {
        try{
            $stmt = $this->conn->prepare('UPDATE denuncias_tb SET den_revisao = 1 WHERE den_id = :id');
            $stmt->bindParam(':id', $id);

            $result = $stmt->execute();

            return $result ? ["sucesso" => true, "result" => "Denuncia revisada!"] : ["sucesso" => false, "result" => "Denuncia não revisada!"];

        }  catch (\Exception $e) {
            echo 'Erro ao denunciar usuário: ' . $e->getMessage();
            return null;
        }
    }

    public function deletarDenuncia($id)
    {
        try{
            $stmt = $this->conn->prepare('DELETE FROM denuncias_tb WHERE den_id = :id');
            $stmt->bindParam(':id', $id);

            $result = $stmt->execute();

            return $result ? ["sucesso" => true, "result" => "Denuncia deletada!"] : ["sucesso" => false, "result" => "Denuncia não deletada!"];

        } catch (\Exception $e) {
            echo 'Erro ao denunciar usuário: ' . $e->getMessage();
            return null;
        }
    }

    public function listarDenuncia($id = false)
    {
        try{
            if ($id) {
                $stmt = $this->conn->prepare('
                SELECT 
                d.den_id,
                d.den_adm_user_id,
                d.den_user_id,
                d.den_anun_id,
                d.den_data,
                d.den_revisao,
                u.user_nome,
                u.user_email
                FROM denuncias_tb as d
                JOIN usuarios_tb as u ON u.user_id = d.den_user_id
                WHERE den_id = :id
                ');
                $stmt->bindParam(':id', $id);
            } else {
                $stmt = $this->conn->prepare('
                SELECT 
                d.den_id,
                d.den_adm_user_id,
                d.den_user_id,
                d.den_anun_id,
                d.den_data,
                d.den_revisao,
                u.user_nome,
                u.user_email
                FROM denuncias_tb as d
                JOIN usuarios_tb as u ON u.user_id = d.den_user_id
                ');
            }
            
            $stmt->execute();

            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            if ($result) {
                return ["sucesso" => true, "result" => $result];
            } else {
                return ["sucesso" => true, "message" => "Não foram encontradas denúncias."];
            }

        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => 'Erro ao denunciar usuário: ' . $e->getMessage()];
        }
    }
    
}