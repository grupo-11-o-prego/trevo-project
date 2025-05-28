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

    public function alterarTitulo($id, $titulo)
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

    public function alterarDescricao($id, $descricao)
    {
        try {
            $stmt = $this->conn->prepare("UPDATE forum_tb SET for_descricao = :descricao WHERE for_id = :id");
            $stmt->bindParam(":descricao", $descricao);
            $stmt->bindParam(":id", $id);

            $result = $stmt->execute();

            if ($result) {
                $forum = $this->get(false, $this->tabela, 'for_id', $id);
                return ["sucesso" => true, "result" => ["for_id" => $forum['result']['for_id'], "for_descricao" => $forum['result']['for_descricao']]];
            } else {
                return ["sucesso" => false];
            }
        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function alterarTema($id, $tema)
    {
        try {
            $stmt = $this->conn->prepare("UPDATE forum_tb SET for_tema = :tema WHERE for_id = :id");
            $stmt->bindParam(":tema", $tema);
            $stmt->bindParam(":id", $id);

            $result = $stmt->execute();

            if ($result) {
                $forum = $this->get(false, $this->tabela, 'for_id', $id);
                return ["sucesso" => true, "result" => ["for_id" => $forum['result']['for_id'], "for_tema" => $forum['result']['for_tema']]];
            } else {
                return ["sucesso" => false];
            }
        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function entrarForum($user, $forId) 
    {
        try{          
            $stmt = $this->conn->prepare("INSERT INTO forum_usuario_tb VALUES (DEFAULT, :forum, :usuario, now())");
            $stmt->bindParam(':forum', $forId);
            $stmt->bindParam(':usuario', $user['id']);

            $result = $stmt->execute();

            return $result ? ["sucesso" => true, "mensagem" => "Entrou no fórum!"] : ["sucesso" => false, "mensagem" => "Ocorreu um erro ao entrar no fórum."];

        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function sairForum($user, $forId) 
    {
        try{          
            $stmt = $this->conn->prepare("DELETE FROM forum_usuario_tb WHERE foruser_for_id = :forum AND foruser_user_id = :usuario");
            $stmt->bindParam(':forum', $forId);
            $stmt->bindParam(':usuario', $user['id']);

            $result = $stmt->execute();

            return $result ? ["sucesso" => true, "mensagem" => "Saiu do fórum!"] : ["sucesso" => false, "mensagem" => "Ocorreu um erro ao sair do fórum."];

        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function getUserForuns($id)
    {
        try{          
            $stmt = $this->conn->prepare("
                select forum_tb.* from forum_tb
                join forum_usuario_tb on foruser_for_id = for_id
                where foruser_user_id = :id;
            ");
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result ? ["sucesso" => true, "result" => $result] : ["sucesso" => true, "message" => "Não foram encontrados fóruns."] ;

        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    //retorna true se a pessoa NÃO estiver presente no fórum
    public function getPresencaForum($user, $forId)
    {
        try{          
            $stmt = $this->conn->prepare("SELECT * FROM forum_usuario_tb WHERE foruser_for_id = :forum AND foruser_user_id = :usuario");
            $stmt->bindParam(':forum', $forId);
            $stmt->bindParam(':usuario', $user['id']);
            $stmt->execute();

            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return !$result ? true : false;

        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }
}
