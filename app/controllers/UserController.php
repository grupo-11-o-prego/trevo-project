<?php

namespace App\Controllers;

include_once __DIR__ . '/../models/UserModel.php';
include_once __DIR__ . '/SessionController.php';

use App\Controllers\SessionController;
use App\Models\UserModel;

class UserController {
    
    private $tabela = 'usuarios_tb';

    public function index() { include_once('../views/login.html'); }

    public function cadastroUsuario() { include_once('../views/cadastro.html'); }
    
    public function anuncio() { include_once('../views/anuncio.html'); }
    
    public function usuario() { include_once('../views/home/usuario.html'); }

    public function perfil() { include_once('../views/home/perfil.html'); }

    public function informacao() { include_once('../views/home/informacao.html'); }
    
    public function viewTrocaNome() { include_once('../views/crud-user/trocanome.html'); }

    public function viewTrocaContato() { include_once('../views/crud-user/trocacontato.html'); }

    public function viewTrocaSenha() { include_once('../views/crud-user/trocasenha.html'); }

    public function viewTrocaVendedor() { include_once('../views/crud-user/modovendedor.html'); }

    public function login() 
    {
        if (isset($_POST)) {
            $result = $this->auth();
            if ($result['sucesso']) {
                $session = new SessionController;
                $login = $session->login($result['result']);
                return ['sucesso' => $login];
            } else {
                return $result;
            }
        } else {
            return ['error' => 'Requisição POST nao realizada.'];
        }
    }
    
    public function auth()
    {
        if (isset($_POST['email']) && isset($_POST['senha'])) {
            $email = $_POST['email'];
            $senha = $_POST['senha'];

            $model = new UserModel;
            $userAuth = $model->findLogin($email, $senha);

            if ($userAuth) {
                $user = $model->get(false, $this->tabela, 'user_email', $email);
                if ($user['sucesso']) {
                    return $user;
                }
            } else {
                return ["sucesso" => false, "message" => "E-mail ou senha incorretos."];
            }
        } else {
            return ["sucesso" => false, "message" => "Requisição POST não realizada."];
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


    public function cadastrar()
    {
        if (isset($_POST)) {
            $nome = $_POST['nome'];
            $email = $_POST['email'];
            $data_nasc = $_POST['data_nasc'];
            $contato = $_POST['contato'];
            $senha = $_POST['senha'];
    
            $model = new UserModel;
            $result = $model->cadastrar($nome, $email, $data_nasc, $contato, $senha);
            return $result;
        } else {
            return ['sucesso' => false, 'error' => 'Requisição POST nao realizada.'];
        }
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
        return $user->deletar($id);
    }
    
    public function trocaNome($id)
    {
        if (isset($_POST)) {
            $nome = $_POST['nome'];
            $model = new UserModel;
            return $model->trocaNome($id, $nome);   
        } else {
            return ['sucesso' => false, 'error' => 'Requisição POST nao realizada.'];
        }
    }

    public function trocaSenha($id)
    {
        if (isset($_POST)) {
            $senha = $_POST['senha_atual'];
            $novaSenha = $_POST['senha_nova'];
            $model = new UserModel;
            return $model->trocaSenha($id, $senha, $novaSenha);
        } else {
            return ['sucesso' => false, 'error' => 'Requisição POST nao realizada.'];
        }
    }

    public function trocaContato($id)
    {
        if (isset($_POST)) {
            $contato = $_POST['contato'];
            $model = new UserModel;
            $result = $model->trocaContato($id, $contato);
            return $result;
        } else {
            return ['sucesso' => false, 'error' => 'Requisição POST nao realizada.'];
        }
    }

    public function trocaDataNascimento($id)
    {
        if (isset($_POST)) {
            $dataNasc = $_POST['data-nasc'];
            $model = new UserModel;
            $result = $model->trocaDataNascimento($id, $dataNasc);
            return $result;
        } else {
            return ['sucesso' => false, 'error' => 'Requisição POST nao realizada.'];
        }
    }

    public function modoVendedor($user)
    {
        if (isset($_POST)) {
            $cpf = $_POST['cpf'];
            $model = new UserModel;
            return $model->modoVendedor($user, $cpf);
        } else {
            return ['sucesso' => false, 'error' => 'Requisição POST nao realizada.'];
        }
    }
    
}
