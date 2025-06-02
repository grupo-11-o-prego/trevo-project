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

$session = new SessionController;
if ($session->isbBanned()) {
    require __DIR__ . '/../app/controllers/HomeController.php';
    $controller = new \App\Controllers\HomeController;
    $controller->banido();
    exit;
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
        header('Content-Type: application/json');
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

    case '/api/logout' :
        $session = new SessionController;
        $session->protectAPI();
        header('Content-Type: application/json');   
        echo json_encode($session->apiLogout());
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

    
    case '/api/user/modovendedor':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        $session = new SessionController;
        header('Content-Type: application/json');
        $session->protectAPI();
        $result = $controller->modoVendedor($_SESSION['user']);
        $result['sucesso'] ? $_SESSION['user']['vendedor'] = 1 : null;
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

    case '/perfil-vendedor':
        require __DIR__ . '/../app/controllers/PerfilController.php';
        $controller = new \App\Controllers\PerfilController;

        // $session = new SessionController;
        // $session->protect(false, false);

        $controller->perfilVendedor();
        break;

    case '/api/perfil':
        require __DIR__ . '/../app/controllers/PerfilController.php';
        $controller = new \App\Controllers\PerfilController;
        $session = new SessionController;  
        $result = $controller->getPerfil( $_SESSION['user']['id']);
        header('Content-Type: application/json');

        if ($result) {
            echo json_encode(['users' => $result]);
        } else {
            echo json_encode(['error' => 'Requisicao GET nao realizada.']);
        }
        break;

    case '/api/getuser':
        require __DIR__ . '/../app/controllers/UserController.php';
        $controller = new \App\Controllers\UserController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $params = Controller::queryParams();
        echo json_encode($controller->getUser($params));
        break;
        
    // -------- ANÚNCIO --------
    case '/criar-anuncio':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        $session = new SessionController;
        $session->protect(false, true);
        $controller->anuncio();
        break;
    case '/atualizar-anuncio':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        $session = new SessionController;
        $session->protect(false, true);
        $controller->anuncioAtualizar();
        break;
    case '/anuncio-detalhes':
        require __DIR__ . '/../app/controllers/AnuncioController.php';
        $controller = new \App\Controllers\AnuncioController;
        $session = new SessionController;
        $session->protect(false, false);
        $controller->anuncioDetalhes();
        break;
  
    case '/api/anuncio/criaranuncio':
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
    case '/denunciar' :
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $controller = new \App\Controllers\DenunciaController;
        $session = new SessionController;
        $controller->denunciartela();
        break;

    case '/api/denuncia/denunciar':
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $denuncia = new \App\Controllers\DenunciaController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        echo json_encode($denuncia->denunciar());
        break;

    case '/api/denuncia/listar':
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $denuncia = new \App\Controllers\DenunciaController;
        header('Content-Type: application/json');
        $session = new SessionController;
        $session->protectAPI(true);
        $params = Controller::queryParams();
        $id = isset($params['id']) ? $params['id'] : null;
        echo json_encode(isset($id) ? $denuncia->listar($id) : $denuncia->listar());
        break;
    
    case '/api/denuncia/revisar' :
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $denuncia = new \App\Controllers\DenunciaController;
        $session = new SessionController;
        header('Content-Type: application/json');
        $session->protectAPI(true);
        $params = Controller::queryParams();
        $id = isset($params['id']) ? $params['id'] : null;
        echo json_encode($denuncia->revisar($id));
        break;

    case '/api/denuncia/deletar':
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $denuncia = new \App\Controllers\DenunciaController;
        $session = new SessionController;
        header('Content-Type: application/json');
        $session->protectAPI(true);
        $controller = new Controller;
        $params = Controller::queryParams();
        $id = isset($params['id']) ? $params['id'] : null;
        echo json_encode($denuncia->deletar($id));
        break;

    case '/api/denuncia/suspenderusuario':
        require __DIR__ . '/../app/controllers/DenunciaController.php';
        $denuncia = new \App\Controllers\DenunciaController;
        $session = new SessionController;
        header('Content-Type: application/json');
        $session->protectAPI(true);
        $params = Controller::queryParams();
        $id = isset($params['id']) ? $params['id'] : null;
        echo json_encode($denuncia->suspenderUsuario($id));
        break;
        
    // -------- FÓRUM --------
    case '/forum' :
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        
        $controller->forum();
        break;
    case '/forum-entrar' :
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        $controller->forumEntrar();
        break;

    case '/forum-comentario' :
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        $controller->forumComentario();
        break;
    case '/forum-detalhes' :
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        $controller->forumDetalhes();
        break;

    case '/api/forum/getforum':
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $params = Controller::queryParams();
        $id = isset($params['id']) ? $params['id'] : null;
        echo json_encode(isset($id) ? $controller->getForum($id) : $controller->getForum());
        break;

    case '/api/forum/getmembros':
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $params = Controller::queryParams();
        $id = isset($params['id']) ? $params['id'] : null;
        echo json_encode($controller->getMembros($id));
        break;

    case '/api/forum/getuserforuns':
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        echo json_encode($controller->getUserForuns($_SESSION['user']['id']));
        break;

    case '/api/forum/getfullforum':
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $params = Controller::queryParams();
        $id = isset($params['id']) ? $params['id'] : null;
        echo json_encode(isset($id) ? $controller->getFullForum($id) : $controller->getFullForum());
        break;

    case '/api/forum/criarforum':
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        echo json_encode($controller->criarForum($_SESSION['user']));
        break;

    case '/api/forum/alterartitulo':
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        // header("Content-Type: application/json");
        $session->protectAPI();
        echo json_encode($controller->alterarTitulo($_SESSION['user']));
        break;

    case '/api/forum/alterardescricao':
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        echo json_encode($controller->alterarDescricao($_SESSION['user']));
        break;

    case '/api/forum/alterartema':
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        echo json_encode($controller->alterarTema($_SESSION['user']));
        break;

    case '/api/forum/entrarforum':
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        $params = Controller::queryParams();
        $id = isset($params['id']) ? $params['id'] : null;
        echo json_encode($controller->entrarForum($_SESSION['user'], $id));
        break;

    case '/api/forum/sairforum':
        require __DIR__ . '/../app/controllers/ForumController.php';
        $controller = new \App\Controllers\ForumController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        $params = Controller::queryParams();
        $id = isset($params['id']) ? $params['id'] : null;
        echo json_encode($controller->sairForum($_SESSION['user'], $id));
        break;

    // -------- POST --------

    case '/api/post/criar':
        require __DIR__ . '/../app/controllers/PostController.php';
        $controller = new \App\Controllers\PostController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        echo json_encode($controller->criarPost($_SESSION['user']));
        break;

    case '/api/post/alterartexto':
        require __DIR__ . '/../app/controllers/PostController.php';
        $controller = new \App\Controllers\PostController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        echo json_encode($controller->alterarTexto($_SESSION['user']));
        break;

    case '/api/post/deletar':
        require __DIR__ . '/../app/controllers/PostController.php';
        $controller = new \App\Controllers\PostController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        $params = Controller::queryParams();
        $id = isset($params['id']) ? $params['id'] : null;
        echo json_encode($controller->deletarPost($_SESSION['user'], $id));
        break;

    case '/api/post/getforumposts':
        require __DIR__ . '/../app/controllers/PostController.php';
        $controller = new \App\Controllers\PostController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        $params = Controller::queryParams();
        $id = isset($params['id']) ? $params['id'] : null;
        echo json_encode($controller->getForumPosts($id));
        break;

    // -------- COMENTÁRIO --------

    case '/api/comentario/criar':
        require __DIR__ . '/../app/controllers/ComentarioController.php';
        $controller = new \App\Controllers\ComentarioController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        echo json_encode($controller->criarComentario($_SESSION['user']));
        break;

    case '/api/comentario/alterar':
        require __DIR__ . '/../app/controllers/ComentarioController.php';
        $controller = new \App\Controllers\ComentarioController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        echo json_encode($controller->alterarComentario($_SESSION['user']));
        break;

    case '/api/comentario/deletar':
        require __DIR__ . '/../app/controllers/ComentarioController.php';
        $controller = new \App\Controllers\ComentarioController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        $params = Controller::queryParams();
        $id = isset($params['id']) ? $params['id'] : null;
        echo json_encode($controller->deletarComentario($_SESSION['user'], $id));
        break;

    case '/api/comentario/getpostcomentarios':
        require __DIR__ . '/../app/controllers/ComentarioController.php';
        $controller = new \App\Controllers\ComentarioController;
        $session = new SessionController;
        header("Content-Type: application/json");
        $session->protectAPI();
        $params = Controller::queryParams();
        $id = isset($params['id']) ? $params['id'] : null;
        echo json_encode($controller->getPostComentarios($id));
        break;

    default:
        http_response_code(404);
        require __DIR__ . '/../app/controllers/HomeController.php';
        $controller = new \App\Controllers\HomeController;
        $controller->erro404();
        break;
}
?>