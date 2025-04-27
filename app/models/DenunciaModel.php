<?php

namespace App\Models;

include_once __DIR__ . '/../../config/DBConnection.php';
include_once __DIR__ . '/../../database/TimeStamp.php';

use Config\DBConnection;
use Database\TimeStamp;

class DenunciaModel {
    
    private $conn;

    public function __construct() {
        $db = new DBConnection();
        $this->conn = $db->getConn();
    }

    public function denunciarUsuario($id)
    {
        try{
            $stmt = $this->conn->prepare('INSERT INTO denuncias_tb (den_user_id, den_data, den_revisao) VALUES (:id, :dia, 0)');
            $stmt->bindParam(':id', $id);

            $data = TimeStamp::stamp();

            $stmt->bindParam(':dia', $data);

            $result = $stmt->execute();

            return $result;

        } catch (\Exception $e) {
            echo 'Erro ao denunciar usuário: ' . $e->getMessage();
            return null;
        }
    }

    public function revisarDenuncia($id)
    {
        try{
            $stmt = $this->conn->prepare('UPDATE denuncias_tb SET den_revisao = 1 WHERE den_id = :id');
            $stmt->bindParam(':id', $id);

            $result = $stmt->execute();

            return $result;

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

            return $result;

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