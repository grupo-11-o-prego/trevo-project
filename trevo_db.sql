-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 14/11/2024 às 21:36
-- Versão do servidor: 8.3.0
-- Versão do PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `trevo_db`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `anuncios_tb`
--

DROP TABLE IF EXISTS `anuncios_tb`;
CREATE TABLE IF NOT EXISTS `anuncios_tb` (
  `anun_id` int NOT NULL AUTO_INCREMENT,
  `anun_titulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `anun_descricao` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `anun_data` datetime DEFAULT NULL,
  `anun_imagem` int DEFAULT NULL,
  `anun_user_id` int DEFAULT NULL,
  `anun_preco` float NOT NULL,
  PRIMARY KEY (`anun_id`),
  KEY `anun_imagem` (`anun_imagem`),
  KEY `anun_user_id` (`anun_user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `anuncios_tb`
--

INSERT INTO `anuncios_tb` (`anun_id`, `anun_titulo`, `anun_descricao`, `anun_data`, `anun_imagem`, `anun_user_id`, `anun_preco`) VALUES
(7, 'Hector Post ASd', 'asd', '2024-11-14 18:31:53', NULL, 17, 12),
(6, 'Hector Post ASd', '123123', '2024-11-14 18:22:35', NULL, 17, 12380);

-- --------------------------------------------------------

--
-- Estrutura para tabela `avaliacao_tb`
--

DROP TABLE IF EXISTS `avaliacao_tb`;
CREATE TABLE IF NOT EXISTS `avaliacao_tb` (
  `aval_id` int NOT NULL AUTO_INCREMENT,
  `aval_user_id` int DEFAULT NULL,
  `aval_vend_id` int DEFAULT NULL,
  `aval_avaliacao` int DEFAULT NULL,
  `aval_data` datetime DEFAULT NULL,
  PRIMARY KEY (`aval_id`),
  KEY `aval_user_id` (`aval_user_id`),
  KEY `aval_vend_id` (`aval_vend_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `comentarios_tb`
--

DROP TABLE IF EXISTS `comentarios_tb`;
CREATE TABLE IF NOT EXISTS `comentarios_tb` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coment_user_id` int DEFAULT NULL,
  `coment_anun_id` int DEFAULT NULL,
  `coment_data` datetime DEFAULT NULL,
  `coment_comentario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `coment_user_id` (`coment_user_id`),
  KEY `coment_anun_id` (`coment_anun_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `compras_tb`
--

DROP TABLE IF EXISTS `compras_tb`;
CREATE TABLE IF NOT EXISTS `compras_tb` (
  `comp_id` int NOT NULL AUTO_INCREMENT,
  `comp_user_id` int DEFAULT NULL,
  `comp_vend_id` int DEFAULT NULL,
  `comp_anun_id` int DEFAULT NULL,
  `comp_data` datetime DEFAULT NULL,
  `comp_valor` int DEFAULT NULL,
  `comp_livro` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`comp_id`),
  KEY `comp_user_id` (`comp_user_id`),
  KEY `comp_vend_id` (`comp_vend_id`),
  KEY `comp_anun_id` (`comp_anun_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `denuncias_tb`
--

DROP TABLE IF EXISTS `denuncias_tb`;
CREATE TABLE IF NOT EXISTS `denuncias_tb` (
  `den_id` int NOT NULL AUTO_INCREMENT,
  `den_adm_user_id` int DEFAULT NULL,
  `den_user_id` int DEFAULT NULL,
  `den_anun_id` int DEFAULT NULL,
  `den_data` datetime DEFAULT NULL,
  `den_revisao` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`den_id`),
  KEY `den_adm_user_id` (`den_adm_user_id`),
  KEY `den_user_id` (`den_user_id`),
  KEY `den_anun_id` (`den_anun_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `denuncias_tb`
--

INSERT INTO `denuncias_tb` (`den_id`, `den_adm_user_id`, `den_user_id`, `den_anun_id`, `den_data`, `den_revisao`) VALUES
(4, NULL, 1, NULL, NULL, NULL),
(2, NULL, 1, NULL, NULL, NULL),
(3, NULL, 1, NULL, NULL, NULL),
(5, NULL, 1, NULL, '2024-11-07 22:28:28', NULL),
(6, NULL, 1, NULL, '2024-11-07 22:34:32', NULL),
(7, NULL, 6, NULL, '2024-11-13 17:24:59', 0),
(10, NULL, 17, NULL, '2024-11-13 17:26:04', 0),
(11, NULL, 17, NULL, '2024-11-13 17:26:06', 0),
(14, NULL, 17, NULL, '2024-11-13 17:27:25', 0),
(15, NULL, 6, NULL, '2024-11-13 18:15:43', 1),
(16, NULL, 17, NULL, '2024-11-13 23:19:15', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `emprestimo_tb`
--

DROP TABLE IF EXISTS `emprestimo_tb`;
CREATE TABLE IF NOT EXISTS `emprestimo_tb` (
  `emp_id` int NOT NULL AUTO_INCREMENT,
  `emp_user_id` int DEFAULT NULL,
  `emp_anun_id` int DEFAULT NULL,
  `emp_data` datetime DEFAULT NULL,
  `emp_livro` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `emp_situacao` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`emp_id`),
  KEY `emp_user_id` (`emp_user_id`),
  KEY `emp_anun_id` (`emp_anun_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `imagem_tb`
--

DROP TABLE IF EXISTS `imagem_tb`;
CREATE TABLE IF NOT EXISTS `imagem_tb` (
  `img_id` int NOT NULL AUTO_INCREMENT,
  `img_nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `img_user_id` int DEFAULT NULL,
  `img_anun_id` int DEFAULT NULL,
  PRIMARY KEY (`img_id`),
  KEY `img_user_id` (`img_user_id`),
  KEY `img_anun_id` (`img_anun_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `lista_desejo_tb`
--

DROP TABLE IF EXISTS `lista_desejo_tb`;
CREATE TABLE IF NOT EXISTS `lista_desejo_tb` (
  `list_desj_user_id` int DEFAULT NULL,
  `list_desj_anun_id` int DEFAULT NULL,
  KEY `list_desj_user_id` (`list_desj_user_id`),
  KEY `list_desj_anun_id` (`list_desj_anun_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `lista_vendedores_fav_tb`
--

DROP TABLE IF EXISTS `lista_vendedores_fav_tb`;
CREATE TABLE IF NOT EXISTS `lista_vendedores_fav_tb` (
  `list_vend_user_id` int DEFAULT NULL,
  `list_vend_vendedor_id` int DEFAULT NULL,
  KEY `list_vend_user_id` (`list_vend_user_id`),
  KEY `list_vend_vendedor_id` (`list_vend_vendedor_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `lista_vendedores_fav_tb`
--

INSERT INTO `lista_vendedores_fav_tb` (`list_vend_user_id`, `list_vend_vendedor_id`) VALUES
(17, 6),
(17, 6),
(6, 17),
(6, 17);

-- --------------------------------------------------------

--
-- Estrutura para tabela `mensagens_tb`
--

DROP TABLE IF EXISTS `mensagens_tb`;
CREATE TABLE IF NOT EXISTS `mensagens_tb` (
  `men_id` int NOT NULL AUTO_INCREMENT,
  `men_enviou_user_id` int DEFAULT NULL,
  `men_receb_user_email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `men_data` datetime DEFAULT NULL,
  `men_mensagem` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`men_id`),
  KEY `men_enviou_user_id` (`men_enviou_user_id`),
  KEY `men_receb_user_id` (`men_receb_user_email`(250))
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `mensagens_tb`
--

INSERT INTO `mensagens_tb` (`men_id`, `men_enviou_user_id`, `men_receb_user_email`, `men_data`, `men_mensagem`) VALUES
(5, 6, 'asd@asd', '2024-11-12 18:26:55', 'asdasdasd'),
(6, 6, 'asd@asd', '2024-11-12 18:27:09', 'Foi!'),
(7, 17, 'teste@teste', '2024-11-13 16:11:29', 'Salva!'),
(8, 17, 'teste@teste', '2024-11-13 16:11:36', 'salva2!\r\n'),
(9, 6, 'asd@asd', '2024-11-13 20:40:04', 'Oi felas');

-- --------------------------------------------------------

--
-- Estrutura para tabela `trocas_tb`
--

DROP TABLE IF EXISTS `trocas_tb`;
CREATE TABLE IF NOT EXISTS `trocas_tb` (
  `troca_id` int NOT NULL AUTO_INCREMENT,
  `troca_user_id` int DEFAULT NULL,
  `troca_anun_id` int DEFAULT NULL,
  `troca_data` datetime DEFAULT NULL,
  `troca_livro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`troca_id`),
  KEY `troca_user_id` (`troca_user_id`),
  KEY `troca_anun_id` (`troca_anun_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios_tb`
--

DROP TABLE IF EXISTS `usuarios_tb`;
CREATE TABLE IF NOT EXISTS `usuarios_tb` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_nome` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_data_nasc` date DEFAULT NULL,
  `user_moderador` tinyint(1) DEFAULT NULL,
  `user_vendedor` tinyint(1) DEFAULT NULL,
  `user_data` datetime DEFAULT NULL,
  `user_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_senha` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_cpf` bigint DEFAULT NULL,
  `user_contato` bigint DEFAULT NULL,
  `user_img_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_img_id` (`user_img_id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios_tb`
--

INSERT INTO `usuarios_tb` (`user_id`, `user_nome`, `user_data_nasc`, `user_moderador`, `user_vendedor`, `user_data`, `user_email`, `user_senha`, `user_cpf`, `user_contato`, `user_img_id`) VALUES
(6, 'Hector Vieira', '2005-12-21', 1, 1, '2024-11-09 20:51:54', 'teste@teste', '$2y$10$nX0SMq3f42Gcm99JJMUkjOU5dvnc1dy4EmV8IQK1jZhNTJ7KqUTbm', 54488473822, 11954303067, NULL),
(17, 'Asd Júnior 2', '0123-03-12', 0, 0, '2024-11-11 22:50:45', 'asd@asd', '$2y$10$LrwavJ31rbmyLzygiu54qOGBg1vK.XY9ZT1k1Hfiq0MLJFYgfptc6', 54488473822, 1212121212, NULL);
COMMIT;

CREATE TABLE IF NOT EXISTS forum_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
