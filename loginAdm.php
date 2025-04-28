<?php
// Verifica se o formulário foi enviado utilizando o método POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Obtém os dados enviados pelo formulário
    $email = trim($_POST["email"]);
    $senha = $_POST["senha"];

    // Configurações de segurança: domínio permitido e hash da senha válida
    $dominio_permitido = '@trevo.com';
    $senha_hash = '$2y$10$hbOfTKvMV4a/uKIAzER7Ve1cUfJm6rbJ0m71QqIq8672OUgnWcjsa'; // Hash de "Trevotop123"

    // Verifica o domínio do email e a senha
    if (strpos($email, $dominio_permitido) !== false && password_verify($senha, $senha_hash)) {
        // Login realizado com sucesso: redireciona para a página principal
        header("Location: index.html");
        exit;
    } else {
        // Caso o login falhe (domínio inválido ou senha incorreta)
        echo "<script>
        alert('Acesso negado: email ou senha inválidos.');
        window.location.href = 'loginAdm.html';
        </script>";
    }
}
?>