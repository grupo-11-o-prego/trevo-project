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
}
