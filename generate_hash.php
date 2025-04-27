<?php
$senha = "Trevotop123";
echo password_hash($senha, PASSWORD_BCRYPT);
//hash de senha do usuário adm do arquivo loginAdm.php
// esse hash é gerado automaticamente pelo algoritmo de criptografia de senhas BCRYPT
?>