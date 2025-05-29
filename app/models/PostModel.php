<?php
namespace App\Models;

include_once __DIR__ . '/Model.php';

class PostModel extends Model
{
    private $tabela = "posts_tb";

    public function criarPost($user, $texto, $forId) 
    {
        try{          
            $stmt = $this->conn->prepare("INSERT INTO posts_tb VALUES (DEFAULT, :usuario, now(), :texto, :forum, 0)");
            $stmt->bindParam(':usuario', $user['id']);
            $stmt->bindParam(':texto', $texto);
            $stmt->bindParam(':forum', $forId);

            $result = $stmt->execute();

            return $result ? ["sucesso" => true, "mensagem" => "Post criado com sucesso!"] : ["sucesso" => false, "mensagem" => "Ocorreu um erro ao criar post."];

        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function alterarTexto($id, $texto)
    {
        try {
            $stmt = $this->conn->prepare("UPDATE posts_tb SET pos_texto = :texto, pos_editado = 1 WHERE pos_id = :id");
            $stmt->bindParam(":texto", $texto);
            $stmt->bindParam(":id", $id);

            $result = $stmt->execute();

            if ($result) {
                $forum = $this->get(false, $this->tabela, 'pos_id', $id);
                return ["sucesso" => true, "result" => ["pos_id" => $forum['result']['pos_id'], "pos_texto" => $forum['result']['pos_texto']]];
            } else {
                return ["sucesso" => false];
            }
        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function deletarPost($id)
    {
        try {
            $stmt = $this->conn->prepare("DELETE FROM posts_tb WHERE pos_id = :id");
            $stmt->bindParam(":id", $id);

            $result = $stmt->execute();

            return $result ? ["sucesso" => true, "mensagem" => "Post deletado!"] : ["sucesso" => false, "mensagem" => "Ocorreu um erro ao deletar post."];
        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function getForumPosts($forId)
    {
        try {
            $stmt = $this->conn->prepare("
            SELECT posts_tb.*, user_nome FROM posts_tb 
            JOIN usuarios_tb ON pos_user_id = user_id
            WHERE pos_for_id = :forum ORDER BY pos_data
            ");
            $stmt->bindParam(":forum", $forId);
            $stmt->execute();
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);


            return $result ? ["sucesso" => true, "result" => $result] : ["sucesso" => true, "mensagem" => "Fórum sem posts."];
        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }
}
