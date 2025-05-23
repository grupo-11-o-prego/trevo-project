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

    public function criarAnuncio($id, $titulo, $descricao, $tipo, $preco, $estado){
        try{          
            $stmt = $this->conn->prepare('INSERT INTO anuncios_tb (anun_titulo, anun_descricao, anun_data, anun_tipo, anun_user_id, anun_preco, anun_estado, anun_status) VALUES (:titulo, :descricao, NOW(),:tipo, :id, :preco, :estado, "DISPONÍVEL")');
            $stmt->bindParam(':titulo', $titulo);
            $stmt->bindParam(':descricao', $descricao);
            $stmt->bindParam(':tipo', $tipo);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':preco', $preco);
            $stmt->bindParam(':estado', $estado);

            $result = $stmt->execute();
            return $result ?  ["sucesso" => true, "result" => "Anúncio criado!"] : ["sucesso" => false, "message" => "Ocorreu um erro ao criar anúncio."];
        }

        catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }

    }

    public function alterarTitulo($id, $titulo, $user)
    {
        try{
            $stmt = $this->conn->prepare('UPDATE anuncios_tb SET anun_titulo = :titulo WHERE anun_id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':titulo', $titulo);

            $result = $stmt->execute();

            if ($result) {
                $anuncio = $this->get(false, $this->tabela, 'anun_id', $id);
                return ["sucesso" => true, "result" => ["anun_id" => $anuncio['result']['anun_id'], "anun_titulo" => $anuncio['result']['anun_titulo']]];
            } else {
                return ["sucesso" => false];
            }

        }  catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function alterarDescricao($id, $descricao, $user)
    {
        try{
            $stmt = $this->conn->prepare('UPDATE anuncios_tb SET anun_descricao = :descricao WHERE anun_id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':descricao', $descricao);

            $result = $stmt->execute();

            if ($result) {
                $anuncio = $this->get(false, $this->tabela, 'anun_id', $id);
                return ["sucesso" => true, "result" => ["anun_id" => $anuncio['result']['anun_id'], "anun_descricao" => $anuncio['result']['anun_descricao']]];
            } else {
                return ["sucesso" => false];
            }

        }  catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function alterarPreco($id, $preco, $user)
    {
        try{
            $stmt = $this->conn->prepare('UPDATE anuncios_tb SET anun_preco = :preco WHERE anun_id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':preco', $preco);

            $result = $stmt->execute();

            if ($result) {
                $anuncio = $this->get(false, $this->tabela, 'anun_id', $id);
                return ["sucesso" => true, "result" => ["anun_id" => $anuncio['result']['anun_id'], "anun_preco" => $anuncio['result']['anun_preco']]];
            } else {
                return ["sucesso" => false];
            }
        }  catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function alterarStatus($id, $status, $user)
    {
        try{
            $stmt = $this->conn->prepare('UPDATE anuncios_tb SET anun_status = :status WHERE anun_id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':status', $status);

            $result = $stmt->execute();

            if ($result) {
                $anuncio = $this->get(false, $this->tabela, 'anun_id', $id);
                return ["sucesso" => true, "result" => ["anun_id" => $anuncio['result']['anun_id'], "anun_status" => $anuncio['result']['anun_status']]];
            } else {
                return ["sucesso" => false];
            }
        }  catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function alterarEstado($id, $estado, $user)
    {
        try{
            $stmt = $this->conn->prepare('UPDATE anuncios_tb SET anun_estado = :estado WHERE anun_id = :id');
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':estado', $estado);

            $result = $stmt->execute();

            if ($result) {
                $anuncio = $this->get(false, $this->tabela, 'anun_id', $id);
                return ["sucesso" => true, "result" => ["anun_id" => $anuncio['result']['anun_id'], "anun_estado" => $anuncio['result']['anun_estado']]];
            } else {
                return ["sucesso" => false];
            }
        }  catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }

    public function listar($id = false)
    {
        try{

            if ($id) {
                $stmt = $this->conn->prepare("
                SELECT a.anun_id, 
                a.*,
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
                a.*,
                u.user_nome,
                u.user_email,
                u.user_contato
                FROM anuncios_tb AS a 
                JOIN usuarios_tb AS u 
                ON a.anun_user_id = u.user_id");
            }
        
            $stmt->execute();
        
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            return $result ? ["sucesso" => true, "result" => $result] : ["sucesso" => true, "message" => "Ocorreu um erro ao listar anúncios."];

        }catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }  

    public function deletarAnuncio($id, $user)
    {
        try{
            $stmt = $this->conn->prepare("DELETE FROM anuncios_tb WHERE anun_id = :id");
            $stmt->bindParam(':id', $id);

            $stmt->execute();

            $row = $stmt->rowCount();
            return $row > 0 ? ["sucesso" => true, "message" => "Anúncio deletado."] : ["sucesso" => false, "message" => "Anúncio não encontrado."];
        } catch (\Exception $e) {
            return ["sucesso" => false, "message" => $e->getMessage()];
        }
    }
}
     







