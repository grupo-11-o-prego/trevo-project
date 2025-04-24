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

    public function criarAnuncio($titulo, $descricao, $preco){
        try{          

           
                $stmt = $this->conn->prepare('INSERT INTO anuncios_tb (anun_titulo, anun_descricao, anun_preco, anun_data, anun_imagem ) VALUES (:titulo, :descricao, :preco, 0, null)');
                $stmt->bindParam(':titulo', $titulo);
                $stmt->bindParam(':descricao', $descricao); 
                $stmt->bindParam(':preco', $preco);            
                $stamp = TimeStamp::stamp();  

                $result = $stmt->execute();
                $id = $this->conn->lastInsertId();

                

                
                $stmt = $this->conn->prepare("SELECT * FROM anuncios_tb WHERE anun_id = :id");
                $stmt->bindParam(':id', $id);
                $stmt->execute();

                
                $anuncioCriado = $stmt->fetch(PDO::FETCH_ASSOC);

                return ["sucesso" => true, "anuncio" => $anuncioCriado];
            
            
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
}
     







