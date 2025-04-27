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
        // header('Content-Type: application/json'); // Define o tipo de resposta como JSON
        $controller = new \App\Controllers\UserController;
        if (isset($_POST)) {
            $user = $controller->auth();
            if (isset($user)) {
                $session = new SessionController;
                $login = $session->login($user);
                echo json_encode(['sucesso' => $login]);
            } else {
                echo json_encode(['sucesso' => false]);
            }
        } else {
            echo json_encode(['error' => 'Requisicao POST nao realizada.']);
        }
        break;
        
    case '/api/cadastro':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        if (isset($_POST)) {
            header('Content-Type: application/json'); // Define o tipo de resposta como JSON
            echo json_encode($controller->cadastrar());
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


    // -------- ANÚNCIO --------
    case '/anuncio':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        $controller->anuncio();
        break;
    
    case '/api/criaranuncio':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        if (isset($_POST)) {
            header('Content-Type: application/json'); // Define o tipo de resposta como JSON
            $response = $controller->criarAnuncio();
            echo json_encode($response);
        } else {
            echo json_encode(['sucesso' => false, 'error' => 'Requisicao POST nao realizada.']);
        }
        break;
    
    // case '/api/deletaranuncio':
    //     require __DIR__ . '/../app/controllers/AnuncioController.php';
    //     $controller = new \App\Controllers\AnuncioController;
    //     $params = Controller::queryParams();
    //     header('Content-Type: application/json'); // Define o tipo de resposta como JSON
        
    //     $response = $controller->deletarAnuncio($params['id']);
            
    //     if($response) {
    //         echo json_encode(['success' => 'Anuncio deletado.']);
    //     } else {
    //         echo json_encode(['error' => 'Requisicao GET nao realizada.']);
    //     }
    //     break;
    
    case '/api/alterartitulo':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        if (isset($_POST)) {
            header('Content-Type: application/json'); // Define o tipo de resposta como JSON
            $response = $controller->alterarTitulo();
            echo json_encode($response);
        } else {
            echo json_encode(['sucesso' => false, 'error' => 'Requisicao POST nao realizada.']);
        }
        break;
        
    case '/api/alterardescricao':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        if (isset($_POST)) {
            header('Content-Type: application/json'); // Define o tipo de resposta como JSON
            $response = $controller->alterarDescricao();
            echo json_encode($response);
        } else {
            echo json_encode(['sucesso' => false, 'error' => 'Requisicao POST nao realizada.']);
        }
        break;
        
    case '/api/alterarpreco':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        if (isset($_POST)) {
            header('Content-Type: application/json'); // Define o tipo de resposta como JSON
            $response = $controller->alterarPreco();
            echo json_encode($response);
        } else {
            echo json_encode(['sucesso' => false, 'error' => 'Requisicao POST nao realizada.']);
        }
        break;

    case '/denuncia' :
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $controller = new \App\Controllers\DenunciaController;
        // $session = new SessionController;
        // $session->protect(true);
        $controller->index();
        break;

    case '/api/denunciar':
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $denuncia = new \App\Controllers\DenunciaController;
        $controller = new Controller;
        $id = 6;

        $result = $denuncia->denunciar($id);
        if ($result) {
            echo json_encode(['sucesso' => true]);
        } else {
            echo json_encode(['sucesso' => false]);
        }
        break;

    case '/api/denuncia/listar':
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $denuncia = new \App\Controllers\DenunciaController;
        
        $id = 14;
        
        if (isset($id)) {
            $result = $denuncia->listar($id);
        } else {
            $result = $denuncia->listar();
        }
        echo json_encode($result);
        break;
    
    case '/api/denuncia/revisar' :
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $denuncia = new \App\Controllers\DenunciaController;
        

        $controller = new Controller;
        $id = 6; 
        
        $result = $denuncia->revisar($id);

        if ($result) {
            echo json_encode(['sucesso' => true]);
        } else {
            echo json_encode(['sucesso' => false]);
        }
        break;

    case '/api/denuncia/deletar':
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $denuncia = new \App\Controllers\DenunciaController;

        $controller = new Controller;
        $id = 6;
        
        $result = $denuncia->deletar($id);
        
        if ($result) {
            echo json_encode(['sucesso' => true]);
        } else {
            echo json_encode(['sucesso' => false]);
        }
        break;
        
    case '/forum':
        require __DIR__ . '/../app/controllers/PostController.php';
        $controller = new \App\Controllers\PostController;
        $controller->form();
        break;

    case '/post/cadastrar':
        require __DIR__ . '/../app/controllers/PostController.php';
        $controller = new \App\Controllers\PostController;
        $controller->cadastrar();
        break;

    default:
        http_response_code(404);
        require __DIR__ . '/../app/controllers/HomeController.php';
        $controller = new \App\Controllers\HomeController;
        $controller->erro404();
        break;
}
?>