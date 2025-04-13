<?php

namespace App\Models;

include_once __DIR__ . '/../../config/DBConnection.php';
include_once __DIR__ . '/../../database/TimeStamp.php';
include_once __DIR__ . '/Model.php';

use Config\DBConnection;
use Database\TimeStamp;
use App\Models\Model;

class UserModel extends Model {
    
    private $conn;

    private $tabela = 'usuarios_tb';

    public function __construct() {
        parent::__construct();
    }

    public function cadastrar($nome, $email, $data_nasc, $contato, $senha) {
        try{
            $stmt = $this->conn->prepare('SELECT * FROM usuarios_tb WHERE user_email = :email');
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $emailExiste = $stmt->fetch(\PDO::FETCH_ASSOC);

            if (!$emailExiste) {
                $stmt = $this->conn->prepare('INSERT INTO usuarios_tb (user_nome, user_email, user_data_nasc, user_contato, user_senha, user_moderador, user_data, user_vendedor) VALUES (:nome, :email, :data_nasc, :contato, :senha, 0, :dia, 0)');

                $stmt->bindParam(':nome', $nome);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':data_nasc', $data_nasc);
                $stmt->bindParam(':contato', $contato);
                $hash = password_hash($senha, PASSWORD_BCRYPT);
                $stmt->bindParam(':senha', $hash);
                $stamp = TimeStamp::stamp();
                $stmt->bindParam(':dia', $stamp);
            
                $result = $stmt->execute();

                if ($result) {
                    return ["sucesso" => true, "result" => $result];
                } else {
                    return ["sucesso" => false, "message" => "Ocorreu um erro cadastrar."];
                }
            } else {
                return ["sucesso" => false, "message" => "E-mail já cadastrado!"];
            }

            

        } catch (\Exception $e) {
            echo json_encode(["message" => 'Erro ao cadastrar usuario: ' . $e->getMessage()]);
            return null;
        }
    }

    public function findLogin($email, $senha) {
        try{
            // Pega o Hash da senha a partir do e-mail digitado.
            $pass = $this->conn->prepare("SELECT user_senha as 'senha' FROM usuarios_tb WHERE user_email = :email");
            $pass->bindParam(':email', $email);

            $pass->execute();
            $passHash = $pass->fetch(\PDO::FETCH_ASSOC);

            if ($passHash) {
                if (password_verify($senha, $passHash['senha'])) {
                    return true;
                }
            }

            return false;

        } catch (\Exception $e) {
            echo json_encode(["message" => 'Erro ao buscar login: ' . $e->getMessage()]);
            return null;
        }
    }

    public function deletar($id)
    {
        try{
            
            $stmt = $this->conn->prepare("DELETE FROM usuarios_tb WHERE user_id = :id");
            $stmt->bindParam(':id', $id);

            $stmt->execute();

            $row = $stmt->rowCount();
            if ($row > 0) {
                return true;
            } else {
                return false;
            }

        } catch (\Exception $e) {
            echo 'Erro ao deletar usuário: ' . $e->getMessage();
            return null;
        }
    }

    public function trocaNome($id, $nome)
    {
        try{
            $stmt = $this->conn->prepare('UPDATE usuarios_tb SET user_nome = :nome WHERE user_id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':nome', $nome);

            $result = $stmt->execute();

            if ($result) {
                $user = $this->get(false, $this->tabela, 'user_id', $id);
                return ["sucesso" => true, "result" => $user];
            } else {
                return ["sucesso" => false];
            }

        }  catch (\Exception $e) {
            echo 'Erro ao atualizar usuário: ' . $e->getMessage();
            return null;
        }
    }

    public function trocaSenha($id, $senha, $novaSenha)
    {
        try{
            // Pega o Hash da senha a partir do id da sessão.
            $pass = $this->conn->prepare("SELECT user_senha as 'senha' FROM usuarios_tb WHERE user_id = :id");
            $pass->bindParam(':id', $id);

            $pass->execute();
            $passHash = $pass->fetch(\PDO::FETCH_ASSOC);

            if ($passHash) {
                if (password_verify($senha, $passHash['senha'])) {
                    $stmt = $this->conn->prepare('UPDATE usuarios_tb SET user_senha = :senha WHERE user_id = :id');
                    $stmt->bindParam(':id', $id);
                    $hash = password_hash($novaSenha, PASSWORD_BCRYPT);
                    $stmt->bindParam(':senha', $hash);

                    $result = $stmt->execute();

                    if ($result) {
                        $user = $this->get(false, $this->tabela, 'user_id', $id);
                        return ["sucesso" => true, "result" => $user];
                    }
                } else {
                    return ["sucesso" => false, "message" => "Senha atual incorreta!"];
                }
            }
            return ["sucesso" => false];

        } catch (\Exception $e) {
            echo 'Erro ao atualizar usuário: ' . $e->getMessage();
            return null;
        }
    }

    public function trocaContato($id, $contato)
    {
        try{
            $stmt = $this->conn->prepare('UPDATE usuarios_tb SET user_contato = :contato WHERE user_id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':contato', $contato);

            $result = $stmt->execute();

            if ($result) {
                $user = $this->get(false, $this->tabela, 'user_id', $id);
                return ["sucesso" => true, "result" => $user];
            } else {
                return ["sucesso" => false];
            }

        }  catch (\Exception $e) {
            echo 'Erro ao atualizar usuário: ' . $e->getMessage();
            return null;
        }
    }

    public function modoVendedor($id, $cpf)
    {
        try{
            $stmt = $this->conn->prepare("UPDATE usuarios_tb SET user_vendedor = 1, user_cpf = :cpf WHERE user_id = :id");
            $stmt->bindParam(':cpf', $cpf);
            $stmt->bindParam(':id', $id);

            $result = $stmt->execute();

            if ($result) {
                $user = $this->get(false, $this->tabela, 'user_id', $id);
                return ["sucesso" => true, "result" => $user];
            } else {
                return ["sucesso" => false];
            }

        } catch (\Exception $e) {
            echo 'Erro ao deletar usuário: ' . $e->getMessage();
            return null;
        }
    }
    
    // Outros métodos como update, delete etc.
}
