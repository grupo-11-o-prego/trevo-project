<?php

include_once('../includes/EnvLoader.php');
include_once('../app/controllers/Controller.php');
include_once('../app/controllers/SessionController.php');
include_once('../config/DBConnection.php');

use Includes\EnvLoader;
use App\Controllers\Controller;
use Config\DBConnection;
use App\Controllers\SessionController;


EnvLoader::load(__DIR__ . '/../.env');

$conn = new DBConnection;
$con = $conn->getConn();

$baseFolder = $_ENV['BASE_URL'];
if(!($baseFolder)) {
    var_dump("variaveis env nao carregadas.");
}

switch (Controller::requestUrl($baseFolder)) {
    case '/' :
        require __DIR__ . '/../app/controllers/HomeController.php';

        $session = new SessionController;
        
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
        $session = new SessionController;
        echo json_encode(
            isset($_SESSION['user']) 
            ? 
            ["sucesso" => true, "user" => $_SESSION['user']] 
            :
            ["sucesso" => false, "message" => "Usuário não logado."]
        );
        
        break;
        
    case '/api/login':
        require __DIR__ . '/../app/controllers/UserController.php';
        header('Content-Type: application/json');   
        $controller = new \App\Controllers\UserController;
        echo json_encode($controller->login());
        break;

    case '/logout' :
        $session = new SessionController;
        $session->protect();
        $session->logout();
        break;
        
    case '/api/cadastro':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        header('Content-Type: application/json');
        echo json_encode($controller->cadastrar());
        break;

    case '/api/deleteuser':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        $params = Controller::queryParams();
        header('Content-Type: application/json');
        echo json_encode($controller->deletar((int) $params['id']));
        break;

    // POST (user_id: id, user_nome: nome)
    case '/api/alterarnome':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        $session = new SessionController;
        header('Content-Type: application/json');
        echo json_encode($controller->trocaNome($_SESSION['user']['id']));
        break;

    case '/api/alterarsenha':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        $session = new SessionController;
        // header('Content-Type: application/json');
        $result = $controller->trocaSenha($_SESSION['user']['id']);
        if ($result['sucesso']) {
            $logout = $session->apiLogout();
            if ($logout['sucesso']) {
                $result['logout'] = true;
            }
        }
        echo json_encode($result);
        break;

    case '/api/alterarcontato':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        $session = new SessionController;
        header('Content-Type: application/json');
        echo json_encode($controller->trocaContato($_SESSION['user']['id']));
        break;

    case '/api/alterardatanasc':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        $session = new SessionController;
        // header('Content-Type: application/json');
        echo json_encode($controller->trocaDataNascimento($_SESSION['user']['id']));
        break;

    case '/perfil':
        require __DIR__ . '/../app/controllers/PerfilController.php';
        $controller = new \App\Controllers\PerfilController;

        // $session = new SessionController;
        // $session->protect(false, false);

        $controller->perfil();
        break;

    case '/api/perfil':
        require __DIR__ . '/../app/controllers/PerfilController.php';
        $controller = new \App\Controllers\PerfilController;
        // $params = Controller::queryParams(); 
        $session = new SessionController;  
        // $id = 6;
        $result = $controller->getPerfil( $_SESSION['user']['id']);
        header('Content-Type: application/json');

        if ($result) {
            echo json_encode(['users' => $result]);
        } else {
            echo json_encode(['error' => 'Requisicao GET nao realizada.']);
        }
        break;
        
    // -------- ANÚNCIO --------
    case '/criar-anuncio':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        $session = new SessionController;
        $session->protect(false, true);
        $controller->anuncio();
        break;
    
    case '/api/criaranuncio':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        $session = new SessionController;
        header('Content-Type: application/json');
        $session->protectAPI(false, true);
        echo json_encode($controller->criarAnuncio($_SESSION['user']['id']));
        break;
    
    case '/api/deletaranuncio':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        $session = new SessionController;
        header('Content-Type: application/json');       
        $session->protectAPI(false, true);
        $params = Controller::queryParams();
        echo json_encode($controller->deletarAnuncio($params['id'], $_SESSION['user']));
        break;
    
    case '/api/alterartitulo':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        $session = new SessionController;
        header('Content-Type: application/json'); // Define o tipo de resposta como JSON
        $session->protectAPI(false, true);
        echo json_encode($controller->alterarTitulo($_SESSION['user'])); 
        break;
        
    case '/api/alterardescricao':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        $session = new SessionController;
        header('Content-Type: application/json'); // Define o tipo de resposta como JSON
        $session->protectAPI(false, true);
        echo json_encode($controller->alterarDescricao($_SESSION['user']));
        break;
        
    case '/api/alterarpreco':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        $session = new SessionController;
        header('Content-Type: application/json'); // Define o tipo de resposta como JSON
        $session->protectAPI(false, true);
        echo json_encode($controller->alterarPreco($_SESSION['user']));
        break;
    
    case '/api/anuncio/alterarstatus':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        $session = new SessionController;
        header('Content-Type: application/json');
        $session->protectAPI(false, true);
        echo json_encode($controller->alterarStatus($_SESSION['user']));
        break;
    
    case '/api/anuncio/alterarestado':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        $session = new SessionController;
        header('Content-Type: application/json');
        $session->protectAPI(false, true);
        echo json_encode($controller->alterarEstado($_SESSION['user']));
        break;


    case '/api/anuncio/listar':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        header('Content-Type: application/json');
        $session = new SessionController;
        // $session->protectAPI();
        $params = Controller::queryParams();
        if (isset($params['id'])) { $id = $params['id']; }
        echo json_encode(isset($id) ? $controller->listar($id) : $controller->listar());
        break;


    // -------- DEÚNCIA --------
    case '/denuncia' :
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $controller = new \App\Controllers\DenunciaController;
        $session = new SessionController;
        $session->protect(true);
        $controller->index();
        break;

    case '/api/denunciar':
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $denuncia = new \App\Controllers\DenunciaController;
        $controller = new Controller;

        $params = Controller::queryParams();
        $id = $params['id'];

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
        header('Content-Type: application/json');

        $session = new SessionController;
        $session->protect(true, false);

        $params = Controller::queryParams();
        
        
        if (isset($id)) {
            $result = $denuncia->listar($params['id'], $_SESSION['user']);
        } else {
            $result = $denuncia->listar();
        }
        echo json_encode($result);
        break;
    
    case '/api/denuncia/revisar' :
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $denuncia = new \App\Controllers\DenunciaController;
        
        $session = new SessionController;
        $session->protectAPI(true);
        
        $params = Controller::queryParams();
        $id = $params['id'];

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

        $session = new SessionController;
        $session->protectAPI(true);

        $controller = new Controller;
        
        $params = Controller::queryParams();
        $id = $params['id'];
        
        $result = $denuncia->deletar($id);
        
        if ($result) {
            echo json_encode(['sucesso' => true]);
        } else {
            echo json_encode(['sucesso' => false]);
        }
        break;
        
    // -------- FÓRUM --------
    case '/forum':
        require __DIR__ . '/../app/controllers/PostController.php';
        $controller = new \App\Controllers\PostController;
        $controller->form();

        $session = new SessionController;
        $session->protect();

        break;

    case '/post/cadastrar':
        require __DIR__ . '/../app/controllers/PostController.php';
        $controller = new \App\Controllers\PostController;

        $session = new SessionController;
        $session->protect();

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