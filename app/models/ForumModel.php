<?php
namespace App\Models;

include_once __DIR__ . '/Model.php';

class ForumModel extends Model
{
    private $tabela = "forum_tb";

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

    public function alterarTitulo($user, $id, $titulo)
    {
        try {
            $stmt = $this->conn->prepare("UPDATE forum_tb SET for_titulo = :titulo WHERE for_id = :id");
            $stmt->bindParam(":titulo", $titulo);
            $stmt->bindParam(":id", $id);

            $result = $stmt->execute();

            if ($result) {
                $forum = $this->get(false, $this->tabela, 'for_id', $id);
                return ["sucesso" => true, "result" => ["for_id" => $forum['result']['for_id'], "for_titulo" => $forum['result']['for_titulo']]];
            } else {
                return ["sucesso" => false];
            }
        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }
}
