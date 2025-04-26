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
        $dbHostname = getenv('DB_HOST');
        $dbName = getenv('DB_NAME');
        $dbUsername = getenv('DB_USER');
        $dbPassword = getenv('DB_PASSWORD');

        try {
            $this->conn = new \PDO("mysql:host=$dbHostname; dbname=$dbName;", $dbUsername, $dbPassword);
            $this->conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        } catch(\Exception $e) {
            echo 'Falha ao conectar: ' . $e->getMessage();
            exit;
        }
    }

    public function getConn()
    {
         return $this->conn;
    }
}

?>