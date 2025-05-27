<?php

namespace App\Models;

include_once __DIR__ . '/../../database/TimeStamp.php';
include_once __DIR__ . '/Model.php';

use App\Models\Model;
use Database\TimeStamp;

class DenunciaModel extends Model {

    public function denunciar($id, $tipo, $motivo, $descricao)
    {
       try{
            if ($tipo == 'user') {
                $stmt = $this->conn->prepare("
                INSERT INTO denuncias_tb 
                (den_data, den_user_id, den_motivo, den_descricao)
                VALUES
                (now(), :id, :motivo, :descricao)
                ");
            } else if ($tipo = 'anun') {
                $stmt = $this->conn->prepare("
                INSERT INTO denuncias_tb
                (den_data, den_anun_id, den_motivo, den_descricao)
                VALUES
                (now(), :id, :motivo, :descricao)
                ");
            } else if ($tipo = 'for') {
                $stmt = $this->conn->prepare("
                INSERT INTO denuncias_tb
                (den_data, den_for_id, den_motivo, den_descricao)
                VALUES
                (now(), :id, :motivo, :descricao)
                ");
            } else if ($tipo = 'post') {
                $stmt = $this->conn->prepare("
                INSERT INTO denuncias_tb
                (den_data, den_post_id, den_motivo, den_descricao)
                VALUES
                (now(), :id, :motivo, :descricao)
                ");
            } else if ($tipo = 'com') {
                $stmt = $this->conn->prepare("
                INSERT INTO denuncias_tb
                (den_data, den_com_id, den_motivo, den_descricao)
                VALUES
                (now(), :id, :motivo, :descricao)
                ");
            } else {
                return ["sucesso" => false, "message" => "Tipo inválido."];
            }
            $stmt->bindParam(":id", $id);
            $stmt->bindParam(":motivo", $motivo);
            $stmt->bindParam(":descricao", $descricao);

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
            return ["sucesso" => false, "message" => $e->getMessage()];
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
            return ["sucesso" => false, "message" => $e->getMessage()];
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
                d.den_for_id,
                d.den_post_id,
                d.den_com_id,
                d.den_data,
                d.den_revisao,
                d.den_motivo,
                d.den_descricao,
                u.user_nome,
                u.user_email,
                a.anun_titulo,
                a.anun_descricao,
                p.post_titulo
                FROM denuncias_tb as d
                LEFT JOIN usuarios_tb as u ON u.user_id = d.den_user_id
                LEFT JOIN anuncios_tb as a ON a.anun_id = d.den_anun_id                
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
                d.den_for_id,
                d.den_post_id,
                d.den_com_id,
                d.den_data,
                d.den_revisao,
                d.den_motivo,
                d.den_descricao,
                u.user_nome,
                u.user_email,
                a.anun_titulo,
                a.anun_descricao
                FROM denuncias_tb as d
                LEFT JOIN usuarios_tb as u ON u.user_id = d.den_user_id
                LEFT JOIN anuncios_tb as a ON a.anun_id = d.den_anun_id
                
                
                ');
            }
        
            $stmt->execute();
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            return $result ? ["sucesso" => true, "result" => $result] : ["sucesso" => false, "message" => "Náo foram encontradas denúncias"];

        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => 'Erro ao denunciar usuário: ' . $e->getMessage()];
        }
    }
    
}