<?php

namespace Includes;

class EnvLoader {
    /**
     * Método estático para carregar variáveis de ambiente a partir de um arquivo .env
     * 
     * @param string $file Caminho do arquivo .env
     * @throws Exception Se o arquivo .env não for encontrado
     */
    public static function load($file) {
        // Verifica se o arquivo .env existe no caminho fornecido
        if (!file_exists($file)) {
            // Lança uma exceção se o arquivo não for encontrado
            throw new \Exception("Arquivo .env não encontrado");
        }

        // Lê todas as linhas do arquivo .env, ignorando linhas vazias ou que só contenham espaços
        $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        // Percorre cada linha do arquivo .env
        foreach ($lines as $line) {
            // Se a linha começar com '#' (comentário), pula para a próxima linha
            if (strpos(trim($line), '#') === 0) {
                continue; // Ignora comentários
            }

            // Divide a linha em duas partes: o nome da variável e seu valor
            list($name, $value) = explode('=', $line, 2);

            // Remove quaisquer espaços em branco ao redor do nome e do valor
            $name = trim($name);
            $value = trim($value);

            // Verifica se a variável ainda não foi definida em $_SERVER ou $_ENV
            if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
                // Define a variável de ambiente no sistema usando putenv()
                putenv(sprintf('%s=%s', $name, $value));
                
                // Também armazena a variável no array $_ENV
                $_ENV[$name] = $value;
            }
        }
    }
}
