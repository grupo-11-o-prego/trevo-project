<?php

include_once('../app/controllers/Controller.php');
include_once('../app/controllers/SessionController.php');
include_once('../config/DBConnection.php');
include_once('../includes/EnvLoader.php');

use Includes\EnvLoader;
use App\Controllers\Controller;
use Config\DBConnection;
use App\Controllers\SessionController;

EnvLoader::load(__DIR__ . '/../.env');
Controller::queryParams();

$conn = new DBConnection;
$con = $conn->getConn();

switch (Controller::requestUrl(getenv('BASE_URL'))) {
    case '/' :
        // echo "Página inicial";
        // var_dump($baseFolder);
        require __DIR__ . '/../app/controllers/HomeController.php';

        // $session = new SessionController;
        // // $session->protect();
        $controller = new \App\Controllers\HomeController;
        $controller->index();
        break;

    case '/login' :
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        $controller->index();
        break;
    
    case '/cadastro' :
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        $controller->cadastroUsuario();
        break;

    case '/logout' :
        $session = new SessionController;
        $session->logout();
        break;


    //========================== API ==========================


    // -------- USUÁRIO --------
    case '/api/logado' :
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        $session = new SessionController;
        // $session->protectAPI();
        $get = Controller::queryParams();

        if (isset($get['admin'])) {
            $result = $session->isAuthenticated(true);
        } else if (isset($get['vendedor'])) {
            $result = $session->isAuthenticated(false, true);
        } else {
            $result = $session->isAuthenticated();
        }
        
        echo json_encode(['sucesso' => $result]);
        
        break;
        
    case '/api/login':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        $controller->login();
    
        echo json_encode(['error' => 'Requisicao POST nao realizada.']);
        break;
        
    case '/api/cadastro':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        if (isset($_POST)) {
            header('Content-Type: application/json'); // Define o tipo de resposta como JSON
            $response = $controller->cadastrar();
            echo json_encode($response);
        } else {
            echo json_encode(['sucesso' => false, 'error' => 'Requisicao POST nao realizada.']);
        }
        break;

    case '/api/getuser':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        $params = Controller::queryParams();
        header('Content-Type: application/json'); // Define o tipo de resposta como JSON

        $response = $controller->getUser($params);
        echo json_encode(['user' => $response]);
    
        if(!isset($response)) {
            echo json_encode(['error' => 'Requisicao GET nao realizada.']);
        }
        break;


    case '/api/deleteuser':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        $params = Controller::queryParams();
        header('Content-Type: application/json'); // Define o tipo de resposta como JSON

        $response = $controller->deletar($params['id']);
    
        if($response) {
            echo json_encode(['success' => 'Usuário deletado.']);
        } else {
            echo json_encode(['error' => 'Requisicao GET nao realizada.']);
        }
        break;


    case '/api/alterarnome':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        if (isset($_POST)) {
            header('Content-Type: application/json'); // Define o tipo de resposta como JSON
            $response = $controller->trocaNome();
            echo json_encode($response);
            break;
        }
        echo json_encode(['sucesso' => false, 'error' => 'Requisicao POST nao realizada.']);
        break;

    default:
        http_response_code(404);
        require __DIR__ . '/../app/controllers/HomeController.php';
        $controller = new \App\Controllers\HomeController;
        $controller->erro404();
        break;
}
?>