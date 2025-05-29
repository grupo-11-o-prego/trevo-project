<?php
namespace App\Models;

include_once __DIR__ . '/Model.php';

class ComentarioModel extends Model
{
    private $tabela = "comentarios_tb";

    public function criarComentario($user, $comentario, $posId) 
    {
        try{          
            $stmt = $this->conn->prepare("INSERT INTO comentarios_tb VALUES (DEFAULT, :usuario, :post, now(), :comentario, 0)");
            $stmt->bindParam(':usuario', $user['id']);
            $stmt->bindParam(':post', $posId);
            $stmt->bindParam(':comentario', $comentario);

            $result = $stmt->execute();

            return $result ? ["sucesso" => true, "mensagem" => "Comentário criado com sucesso!"] : ["sucesso" => false, "mensagem" => "Ocorreu um erro ao criar comentário."];

        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function alterarComentario($id, $comentario)
    {
        try {
            $stmt = $this->conn->prepare("UPDATE comentarios_tb SET com_comentario = :comentario, com_editado = 1 WHERE com_id = :id");
            $stmt->bindParam(":comentario", $comentario);
            $stmt->bindParam(":id", $id);

            $result = $stmt->execute();

            if ($result) {
                $forum = $this->get(false, $this->tabela, 'com_id', $id);
                return ["sucesso" => true, "result" => ["com_id" => $forum['result']['com_id'], "com_comentario" => $forum['result']['com_comentario']]];
            } else {
                return ["sucesso" => false];
            }
        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function deletarComentario($id)
    {
        try {
            $stmt = $this->conn->prepare("DELETE FROM comentarios_tb WHERE com_id = :id");
            $stmt->bindParam(":id", $id);

            $result = $stmt->execute();

            return $result ? ["sucesso" => true, "mensagem" => "Comentário deletado!"] : ["sucesso" => false, "mensagem" => "Ocorreu um erro ao deletar comentário."];
        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function getPostComentarios($posId)
    {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM comentarios_tb WHERE com_pos_id = :post ORDER BY cp,_data");
            $stmt->bindParam(":post", $posId);
            $stmt->execute();
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);


            return $result ? ["sucesso" => true, "result" => $result] : ["sucesso" => true, "mensagem" => "Post sem comentários."];
        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }
}
