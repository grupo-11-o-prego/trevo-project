<?php
namespace App\Models;

include_once __DIR__ . '/Model.php';

class ForumModel extends Model
{
    public function criarForum($user, $titulo, $descricao, $tema) 
    {
        try{          
            $stmt = $this->conn->prepare("INSERT INTO forum_tb (for_titulo, for_descricao, for_tema, for_criador_user_id) VALUES (:titulo, :descricao, :tema, :usuario)");
            $stmt->bindParam(':titulo', $titulo);
            $stmt->bindParam(':descricao', $descricao);
            $stmt->bindParam(':tema', $tema);
            $stmt->bindParam(':usuario', $user['id']);

            $result = $stmt->execute();

            return $result ? ["sucesso" => true, "mensagem" => "Fórum criado com sucesso!"] : ["sucesso" => false, "mensagem" => "Ocorreu um erro ao criar fórum."];

        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }
}
