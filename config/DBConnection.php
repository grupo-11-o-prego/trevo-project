<?php 

namespace Config;

include_once('../includes/EnvLoader.php');

use Includes\EnvLoader;

class DBConnection {

    protected $conn;

    public function __construct()
    {
        EnvLoader::load(__DIR__ . '/../.env');

        // Pega os dados do banco de dados do arquivo .env
        $dbHostname = $_ENV['DB_HOST'];
        $dbName     = $_ENV['DB_NAME'];
        $dbUsername = $_ENV['DB_USER'];
        $dbPassword = $_ENV['DB_PASSWORD'];

        try {
            $this->conn = new \PDO("mysql:host=$dbHostname; dbname=$dbName;", $dbUsername, $dbPassword);
            $this->conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        } catch(\Exception $e) {
            header('Content-Type: application/json');
            echo json_encode(["Conectado" => false, "Mensagem" => $e->getMessage()]);
            exit;
        }
    }

    public function getConn()
    {
         return $this->conn;
    }
}

?>