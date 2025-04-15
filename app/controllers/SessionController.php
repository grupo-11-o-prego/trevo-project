<?php

namespace App\Controllers;

use Includes\EnvLoader;
EnvLoader::load(__DIR__ . '/../../.env');

class SessionController
{
    public function __construct()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function login($userData)
    {
        $_SESSION['user'] = [
            'id' => $userData['user_id'],
            'email' => $userData['user_email'],
            'nome' => $userData['user_nome'],
            'admin' => $userData['user_moderador'],
            'vendedor' => $userData['user_vendedor']
        ];
    }

    public function isAuthenticated($admin = false, $vendedor = false)
    {
        if ($admin){
            return $_SESSION['user']['admin'] == 1;
        }
        if ($vendedor){
            return $_SESSION['user']['vendedor'] == 1;
        }
        return isset($_SESSION['user']['id']);
    }

    public function protect($admin = false, $vendedor = false)
    {
        if ($admin) {
            if (!$this->isAuthenticated(true)) {
                header('Location: /trevo/public/');
                return;
            } 
        }

        if ($vendedor) {
            if (!$this->isAuthenticated(false, true)) {
                header('Location: /trevo/public/');
                return;
            } 
        }

        if (!$this->isAuthenticated()) {
            header('Location: /trevo/public/login');
            return;
        } 
    }

    public function protectAPI($admin = false, $vendedor = false)
    {
        if ($admin) {
            if (!$this->isAuthenticated(true)) {
                echo json_encode(["sucesso" => false, "mensagem" => "Requer permissão de ADMIN"]);
                exit;
                return;
            } 
        }

        if ($vendedor) {
            if (!$this->isAuthenticated(false, true)) {
                echo json_encode(["sucesso" => false, "mensagem" => "Requer conta de VENDEDOR"]);
                exit;
                return;
            } 
        }

        if (!$this->isAuthenticated()) {
            echo json_encode(["sucesso" => false, "mensagem" => "Requer login"]);
            exit;
            return;
        } 
    }

    public function getUser()
    {
        return $_SESSION['user'] ?? null;
    }

    public function logout()
    {
        session_unset();
        session_destroy();
        header('Location: ' . getenv('BASE_URL') . '/login');
    }
}