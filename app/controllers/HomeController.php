<?php

namespace App\Controllers;

class HomeController {

    public static function index()
    {
        include_once('../views/index.html');
    }

    public function erro404()
    {
        include_once('../views/erro404.html');
        
    }

    public function banido()
    {
        include_once('../views/banido.html');
    }

}