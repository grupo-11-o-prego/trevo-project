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
            } else if ($tipo == 'anun') {
                $stmt = $this->conn->prepare("
                INSERT INTO denuncias_tb
                (den_data, den_anun_id, den_motivo, den_descricao)
                VALUES
                (now(), :id, :motivo, :descricao)
                ");
            } else if ($tipo == 'for') {
                $stmt = $this->conn->prepare("
                INSERT INTO denuncias_tb
                (den_data, den_for_id, den_motivo, den_descricao)
                VALUES
                (now(), :id, :motivo, :descricao)
                ");
            } else if ($tipo == 'post') {
                $stmt = $this->conn->prepare("
                INSERT INTO denuncias_tb
                (den_data, den_post_id, den_motivo, den_descricao)
                VALUES
                (now(), :id, :motivo, :descricao)
                ");
            } else if ($tipo == 'com') {
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
                au.user_email as anun_user_email,
                au.user_nome as anun_user_nome,
                a.anun_user_id as dono_anuncio_user_id,
                a.anun_titulo,
                a.anun_descricao,
                f.for_titulo,
                f.for_descricao,
                f.for_criador_user_id,
                uf.user_nome AS for_criador_user_nome,
                uf.user_email AS for_criador_user_email,
                p.pos_texto,
                p.pos_user_id AS dono_post_user_id,
                up.user_nome AS dono_post_nome,
                up.user_email AS dono_post_email,
                c.com_comentario,
                c.com_user_id AS dono_comentario_user_id,                
                uc.user_nome AS dono_comentario_nome,
                uc.user_email AS dono_comentario_email
                FROM denuncias_tb as d
                LEFT JOIN usuarios_tb AS u ON u.user_id = d.den_user_id
                LEFT JOIN anuncios_tb AS a ON a.anun_id = d.den_anun_id 
                LEFT JOIN usuarios_tb AS au ON au.user_id = a.anun_user_id 
                LEFT JOIN forum_tb AS f ON f.for_id = d.den_for_id
                LEFT JOIN usuarios_tb AS uf ON uf.user_id = f.for_criador_user_id
                LEFT JOIN posts_tb AS p ON p.pos_id = d.den_post_id
                LEFT JOIN usuarios_tb AS up ON up.user_id = p.pos_user_id
                LEFT JOIN comentarios_tb AS c ON c.com_id = d.den_com_id
                LEFT JOIN usuarios_tb AS uc ON uc.user_id = c.com_user_id            
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
                au.user_email as anun_user_email,
                au.user_nome as anun_user_nome,
                a.anun_user_id as dono_anuncio_user_id,
                a.anun_titulo,
                a.anun_descricao,
                f.for_titulo,
                f.for_descricao,
                f.for_criador_user_id,
                uf.user_nome AS for_criador_user_nome,
                uf.user_email AS for_criador_user_email,
                p.pos_texto,
                p.pos_user_id AS dono_post_user_id,
                up.user_nome AS dono_post_nome,
                up.user_email AS dono_post_email,
                c.com_comentario,
                c.com_user_id AS dono_comentario_user_id,               
                uc.user_nome AS dono_comentario_nome,
                uc.user_email AS dono_comentario_email
                FROM denuncias_tb as d
                LEFT JOIN usuarios_tb AS u ON u.user_id = d.den_user_id
                LEFT JOIN anuncios_tb AS a ON a.anun_id = d.den_anun_id 
                LEFT JOIN usuarios_tb AS au ON au.user_id = a.anun_user_id 
                LEFT JOIN forum_tb AS f ON f.for_id = d.den_for_id
                LEFT JOIN usuarios_tb AS uf ON uf.user_id = f.for_criador_user_id
                LEFT JOIN posts_tb AS p ON p.pos_id = d.den_post_id
                LEFT JOIN usuarios_tb AS up ON up.user_id = p.pos_user_id
                LEFT JOIN comentarios_tb AS c ON c.com_id = d.den_com_id
                LEFT JOIN usuarios_tb AS uc ON uc.user_id = c.com_user_id         
                ');
            }
        
            $stmt->execute();
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            return $result ? ["sucesso" => true, "result" => $result] : ["sucesso" => false, "message" => "Náo foram encontradas denúncias"];

        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => 'Erro ao denunciar usuário: ' . $e->getMessage()];
        }
    }

    public function suspenderUsuario($id)
    {
        try{
            $stmt = $this->conn->prepare('UPDATE usuarios_tb SET user_ativo = 0 WHERE user_id = :id');
            $stmt->bindParam(':id', $id);

            $stmt->execute();

            $row = $stmt->rowCount();
            return $row > 0 ? ["sucesso" => true, "message" => "Usuário suspenso!"] : ["sucesso" => true, "message" => "Usuário não encontrado."];

        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }
    
}