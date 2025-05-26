<?php

namespace App\Models;

include_once __DIR__ . '/../../config/DBConnection.php';
include_once __DIR__ . '/../../database/TimeStamp.php';

use Config\DBConnection;


class Model {

    protected $conn;

    public function __construct() {
        $db = new DBConnection();
        $this->conn = $db->getConn();
    }

    /**
     * Método padrão para buscar valores no banco de dados.
     * 
     * @param boolean $multiple Define se a consulta SQL retornará um dado (false) ou muitos (true)
     * @param string $tabela Define a tabela que será consultada
     * @param string $campo Define o campo que será comparado com o valor da query
     * @param string $valor Define o valor que será comparado com o campo da query
     * @return $result Array associativo com o resultado da query ou falso se não encontrar
     * @throws Exception Se ocorrer um erro na execução da query
     */
    public function get($multiple, $tabela, $campo = null, $valor = null) {
        try{
            if (isset($campo) && isset($valor)) {
                $sql = "SELECT * FROM " . $tabela . " WHERE " . $campo . " = :valor";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(":valor", $valor);
            } else {
                $sql = "SELECT * FROM ". $tabela;
                $stmt = $this->conn->prepare($sql);
            }

            $stmt->execute();

            $result = $multiple ? $stmt->fetchAll(\PDO::FETCH_ASSOC) : $stmt->fetch(\PDO::FETCH_ASSOC);

            return $result ? ["sucesso" => true, "result" => $result] : ["sucesso" => false, "result" => "Não encontrado"];

        } catch (\Exception $e) {
            return ["sucesso" => false, "erro" => 'Erro ao realizar query em ' . $tabela . ': ' . $e->getMessage()];
        }
    }

     /**
     * Método padrão para deletar valores no banco de dados.
     * 
     * @param string $tabela Define a tabela que será utilizada na exclusão
     * @param string $campo Define o campo que será comparado com o valor da query
     * @param string $valor Define o valor que será comparado com o campo da query
     * @return $result Array associativo com o resultado da query ou falso se não encontrar
     * @throws Exception Se ocorrer um erro na execução da query
     */
    public function delete($tabela, $campo, $valor) {
        try{
            $sql = "DELETE FROM " . $tabela . " WHERE " . $campo. " = :valor";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':valor', $valor);

            $stmt->execute();

            $row = $stmt->rowCount();
            if ($row > 0) {
                return ["sucesso" => true, "linhas-removidas" => $row];
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return ["sucesso" => false, "erro" => 'Erro ao realizar query em ' . $tabela . ': ' . $e->getMessage()];
        }
    }
}