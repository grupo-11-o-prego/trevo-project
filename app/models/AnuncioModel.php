<?php

namespace App\Models;

include_once __DIR__ . '/../../database/TimeStamp.php';
include_once __DIR__ . '/Model.php';

use Database\TimeStamp;
use App\Models\Model;

class AnuncioModel extends Model {
    private $tabela = 'anuncios_tb'; 

    public function __construct(){
        parent:: __construct();
    }

    public function criarAnuncio($id, $titulo, $descricao, $preco){
        try{          

           
                $stmt = $this->conn->prepare('INSERT INTO anuncios_tb (anun_titulo, anun_descricao, anun_data, anun_user_id, anun_preco ) VALUES (:titulo, :descricao, NOW(), :id, :preco)');
                $stmt->bindParam(':titulo', $titulo);
                $stmt->bindParam(':descricao', $descricao); 
                $stmt->bindParam(':id', $id);            
                $stmt->bindParam(':preco', $preco);            

                $result = $stmt->execute();
                // $id = $this->conn->lastInsertId();
                // $stmt = $this->conn->prepare("SELECT * FROM anuncios_tb WHERE anun_id = :id");
                // $stmt->bindParam(':id', $id);
                // $stmt->execute();
                // $anuncioCriado = $stmt->fetch(\PDO::FETCH_ASSOC);
                // return ["sucesso" => true, "anuncio" => $anuncioCriado];
                if ($result) {
                    return ["sucesso" => true, "result" => $result];
                } else {
                    return ["sucesso" => false, "message" => "Ocorreu um erro ao criar anúncio."];
                }
            
        }

        catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }

    }

    public function alterarTitulo($id, $titulo)
    {
        try{
            $stmt = $this->conn->prepare('UPDATE anuncios_tb SET anun_titulo = :titulo WHERE anun_id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':titulo', $titulo);

            $result = $stmt->execute();

            if ($result) {
                $anuncio = $this->get(false, $this->tabela, 'anun_id', $id);
                return ["sucesso" => true, "result" => $anuncio];
            } else {
                return ["sucesso" => false];
            }

        }  catch (\Exception $e) {
            echo 'Erro ao atualizar usuário: ' . $e->getMessage();
            return null;
        }
    }

    public function alterarDescricao($id, $descricao)
    {
        try{
            $stmt = $this->conn->prepare('UPDATE anuncios_tb SET anun_descricao = :descricao WHERE anun_id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':descricao', $descricao);

            $result = $stmt->execute();

            if ($result) {
                $anuncio = $this->get(false, $this->tabela, 'anun_id', $id);
                return ["sucesso" => true, "result" => $descricao];
            } else {
                return ["sucesso" => false];
            }

        }  catch (\Exception $e) {
            echo 'Erro ao atualizar usuário: ' . $e->getMessage();
            return null;
        }
    }

    public function alterarPreco($id, $preco)
    {
        try{
            $stmt = $this->conn->prepare('UPDATE anuncios_tb SET anun_preco = :preco WHERE anun_id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':preco', $preco);

            $result = $stmt->execute();

            if ($result) {
                $anuncio = $this->get(false, $this->tabela, 'anun_id', $id);
                return ["sucesso" => true, "result" => $preco];
            } else {
                return ["sucesso" => false];
            }

        }  catch (\Exception $e) {
            echo 'Erro ao atualizar usuário: ' . $e->getMessage();
            return null;
        }
    }

    public function listar($id = false)
    {
        try{

            if ($id) {
                $stmt = $this->conn->prepare("
                SELECT a.anun_id, 
                a.anun_titulo, 
                a.anun_descricao, 
                a.anun_data, 
                a.anun_imagem, 
                a.anun_user_id, 
                a.anun_preco, 
                u.user_nome,
                u.user_email,
                u.user_contato
                FROM anuncios_tb AS a 
                JOIN usuarios_tb AS u ON a.anun_user_id = u.user_id 
                WHERE anun_id = :id");
                $stmt->bindParam(':id', $id);
            } else {
                $stmt = $this->conn->prepare("
                SELECT a.anun_id, 
                a.anun_titulo, 
                a.anun_descricao, 
                a.anun_data, 
                a.anun_imagem, 
                a.anun_user_id, 
                a.anun_preco, 
                u.user_nome,
                u.user_email,
                u.user_contato
                FROM anuncios_tb AS a 
                JOIN usuarios_tb AS u 
                ON a.anun_user_id = u.user_id");
            }
        
            $stmt->execute();
        
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        
            if ($result) {
                return ["sucesso" => true, "result" => $result];
            } else {
                return ["sucesso" => false, "message" => "Ocorreu um erro ao listar anúncios.", "stmt" => $stmt];
            }
        }catch (\Exception $e) {
            echo 'Erro ao denunciar usuário: ' . $e->getMessage();
            return null;
        }
        
    }
}
     







