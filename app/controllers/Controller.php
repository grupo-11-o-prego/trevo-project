<?php

namespace App\Controllers;

class Controller {

      /**
     * Método estático para retornar o URL PATH da requisição
     * 
     * @param string $baseFolder - Caminho base do projeto
     * @return string $request - URL PATH tratada
     */
    public static function requestUrl($baseFolder)
    {
        // Captura o caminho da URL (sem o nome do projeto)
        $request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $request = str_replace($baseFolder, '', $request);
        return $request;
    }


    /**
     * Método estático para retornar os Query Params, em caso de requisições GET
     * 
     * @return $queryParams - Array associativo com os dados passados por GET
     */
    public static function queryParams()
    {
        $queryString = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
        if ($queryString) {
            parse_str($queryString, $queryParams);
            return $queryParams;
        }
    }
}