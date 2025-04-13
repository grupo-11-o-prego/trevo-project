<?php

namespace App\Controllers;

include_once __DIR__ . '/../models/UserModel.php';

use App\Models\UserModel;

class UserController {
    
    private $tabela = 'usuarios_tb';

    public function index() { include_once('../views/home/login.html'); }

    public function cadastroUsuario() { include_once('../views/index.html'); }
    
    public function usuario() { include_once('../views/home/usuario.html'); }

    public function perfil() { include_once('../views/home/perfil.html'); }

    public function informacao() { include_once('../views/home/informacao.html'); }
    
    public function viewTrocaNome() { include_once('../views/crud-user/trocanome.html'); }

    public function viewTrocaContato() { include_once('../views/crud-user/trocacontato.html'); }

    public function viewTrocaSenha() { include_once('../views/crud-user/trocasenha.html'); }

    public function viewTrocaVendedor() { include_once('../views/crud-user/modovendedor.html'); }

    public function login() {

        if (isset($_POST)) {
            header('Content-Type: application/json'); // Define o tipo de resposta como JSON
            $user = $this->auth();
            if (isset($user)) {
                echo json_encode(['sucesso' => true]);
                $session = new SessionController;
                $session->login($user);
            } else {
                echo json_encode(['sucesso' => false]);
            }
        }

    }

    public function getUser($get)
    {
        $model = new UserModel;

        if (isset($get['id'])) {
            $result = $model->get(false, $this->tabela, 'user_id', $get['id']);
        } else if (isset($get['email'])) {
            $result = $model->get(false, $this->tabela, 'user_email', $get['email']);
        } else {
            $result = $model->get(true, $this->tabela);
        }

        return $result;
    }

    public function auth()
    {
        $email = $_POST['email'];
        $senha = $_POST['senha'];

        $model = new UserModel;
        $userAuth = $model->findLogin($email, $senha);
        $user = $model->get(false, $this->tabela, 'user_email', $email);
        if ($userAuth) {
            return $user;
        } else {
            return null;
        }
    }

    public function cadastrar()
    {
        $nome = $_POST['nome'];
        $email = $_POST['email'];
        $data_nasc = $_POST['data_nasc'];
        $contato = $_POST['contato'];
        $senha = $_POST['senha'];

        $model = new UserModel;
        $result = $model->cadastrar($nome, $email, $data_nasc, $contato, $senha);
        return $result;
    }

    public function findUser($id = null, $email = null)
    {
        $model = new UserModel;
        if (isset($id)){
            return $model->get(false, $this->tabela, 'user_id', $id);
        } else if (isset($email)) {
            return $model->get(false, $this->tabela, 'user_email', $email);
        }
    }

    public function deletar($id)
    {
        $user = new UserModel;

        $result = $user->deletar($id);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }
    
    public function trocaNome()
    {
        $id = $_POST['id'];
        $nome = $_POST['nome'];
        $model = new UserModel;
        $result = $model->trocaNome($id, $nome);
        return $result;
    }

    public function trocaSenha($id)
    {
        $senha = $_POST['senha'];
        $novaSenha = $_POST['nova-senha'];
        $model = new UserModel;
        $result = $model->trocaSenha($id, $senha, $novaSenha);
        return $result;
    }

    public function trocaContato($id)
    {
        $contato = $_POST['contato'];
        $model = new UserModel;
        $result = $model->trocaContato($id, $contato);
        return $result;
    }

    public function modoVendedor($id)
    {
        $cpf = $_POST['cpf'];

        $model = new UserModel;
        $result = $model->modoVendedor($id, $cpf);

        return $result;
    }
    
}
