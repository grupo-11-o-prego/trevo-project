<?php
// Habilita a exibição de erros para depuração (não use em ambiente de produção)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configurações do banco de dados
$host = "localhost";
$user = "root";
$password = "";
$dbname = "admin_login";

// Cria uma nova conexão com o banco de dados utilizando MySQLi
$conn = new mysqli($host, $user, $password, $dbname);

// Verifica se houve erro na conexão com o banco de dados
if ($conn->connect_error) {
    // Se houver erro, interrompe a execução e exibe a mensagem de erro
    die("Erro na conexão: " . $conn->connect_error);
}

// Verifica se o formulário foi enviado utilizando o método POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Obtém os dados enviados pelo formulário e realiza o tratamento dos valores
    $email = trim($_POST["email"]); // Remove espaços em branco do início e fim do email
    $senha = $_POST["senha"];         // Captura a senha (em produção, utilize hash para senhas)

    // Prepara uma consulta SQL para evitar injeção de código (SQL Injection)
    $stmt = $conn->prepare("SELECT email FROM administrators WHERE email = ? AND password = ?");
    if ($stmt === false) {
        // Caso ocorra erro na preparação da consulta, exibe uma mensagem de erro e encerra o script
        die("Erro na preparação da consulta: " . $conn->error);
    }
    
    // Aceita os parâmetros enviados pelo formulário, vinculando-os à consulta preparada
    $stmt->bind_param("ss", $email, $senha);
    
    // Executa a consulta preparada
    $stmt->execute();

    // Obtém o resultado da consulta
    $result = $stmt->get_result();

    // Se houver pelo menos um registro, os dados de login estão corretos
    if ($result->num_rows > 0) {
        // Login realizado com sucesso: redireciona o usuário para a página principal/index
        header("Location: index.html");
        exit; // Interrompe o script após o redirecionamento
    } else {
        // Se nenhum registro for encontrado: alerta o usuário que o email ou senha estão incorretos
        echo "<script>
        alert('Acesso negado: email ou senha inválidos.');
        window.location.href = 'loginAdm.html';
      </script>";    }

    // Fecha a instrução preparada para liberar recursos
    $stmt->close();
}

// Fecha a conexão com o banco de dados
$conn->close();
?>