CREATE DATABASE admin_login;

USE admin_login;

CREATE TABLE administrators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Insere os administradores permitidos com a senha "Trevotop123"
INSERT INTO administrators (email, password)
VALUES 
    ('emanuelle@trevo.com', 'Trevotop123'),
    ('theo@trevo.com', 'Trevotop123'),
    ('ana@trevo.com', 'Trevotop123'),
    ('hector@trevo.com', 'Trevotop123'),
    ('gabriel@trevo.com', 'Trevotop123');

