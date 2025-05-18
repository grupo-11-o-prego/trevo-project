-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 18/05/2025 às 20:28
-- Versão do servidor: 9.1.0
-- Versão do PHP: 8.3.14

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
  `anun_tipo` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `anun_user_id` int DEFAULT NULL,
  `anun_cliente_user_id` int DEFAULT NULL,
  `anun_preco` float NOT NULL,
  `anun_status` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `anun_estado` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`anun_id`),
  KEY `anun_imagem` (`anun_imagem`),
  KEY `anun_user_id` (`anun_user_id`),
  KEY `fk_anuncios_cliente_user` (`anun_cliente_user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `anuncios_tb`
--

INSERT INTO `anuncios_tb` (`anun_id`, `anun_titulo`, `anun_descricao`, `anun_data`, `anun_imagem`, `anun_tipo`, `anun_user_id`, `anun_cliente_user_id`, `anun_preco`, `anun_status`, `anun_estado`) VALUES
(3, 'Livro Duna', 'Livro Duna, de Frank Herbert, editora Intrínseca', '2025-05-08 20:53:48', NULL, NULL, 2, NULL, 70, 'DISPONÍVEL', 'NOVO'),
(4, 'Livro Duna', 'Livro Duna, de Frank Herbert, editora Intrínseca', '2025-05-08 20:53:54', NULL, NULL, 2, NULL, 70, 'DISPONÍVEL', 'NOVO'),
(6, 'Biografia do Dudu', 'Biografia do Menino Eduardo completa!', '2025-05-08 21:12:56', NULL, NULL, 2, NULL, 30, 'DISPONÍVEL', 'SEMINOVO');

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
-- Estrutura para tabela `denuncias_tb`
--

DROP TABLE IF EXISTS `denuncias_tb`;
CREATE TABLE IF NOT EXISTS `denuncias_tb` (
  `den_id` int NOT NULL AUTO_INCREMENT,
  `den_adm_user_id` int DEFAULT NULL,
  `den_user_id` int DEFAULT NULL,
  `den_anun_id` int DEFAULT NULL,
  `den_motivo` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `den_descricao` varchar(350) COLLATE utf8mb4_general_ci NOT NULL,
  `den_data` datetime NOT NULL,
  `den_revisao` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`den_id`),
  KEY `den_adm_user_id` (`den_adm_user_id`),
  KEY `den_user_id` (`den_user_id`),
  KEY `den_anun_id` (`den_anun_id`)
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
-- Estrutura para tabela `mensagens_tb`
--

DROP TABLE IF EXISTS `mensagens_tb`;
CREATE TABLE IF NOT EXISTS `mensagens_tb` (
  `men_id` int NOT NULL AUTO_INCREMENT,
  `men_enviou_user_id` int DEFAULT NULL,
  `men_receb_user_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `men_data` datetime DEFAULT NULL,
  `men_mensagem` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`men_id`),
  KEY `men_enviou_user_id` (`men_enviou_user_id`),
  KEY `men_receb_user_id` (`men_receb_user_email`(250))
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios_tb`
--

DROP TABLE IF EXISTS `usuarios_tb`;
CREATE TABLE IF NOT EXISTS `usuarios_tb` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_ativo` tinyint(1) NOT NULL,
  `user_nome` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_data_nasc` date DEFAULT NULL,
  `user_moderador` tinyint(1) DEFAULT NULL,
  `user_vendedor` tinyint(1) DEFAULT NULL,
  `user_data` datetime DEFAULT NULL,
  `user_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_senha` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_cpf` bigint DEFAULT NULL,
  `user_contato` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_img_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_img_id` (`user_img_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios_tb`
--

INSERT INTO `usuarios_tb` (`user_id`, `user_ativo`, `user_nome`, `user_data_nasc`, `user_moderador`, `user_vendedor`, `user_data`, `user_email`, `user_senha`, `user_cpf`, `user_contato`, `user_img_id`) VALUES
(1, 0, 'Usuário Leitor', '2005-12-21', 0, 0, '2025-05-08 19:35:03', 'leitor@gmail.com', '$2y$10$OuLfMxeWBnE1wI6bv2/goOU86FkDqXRjgEmMvAV74hkHSJGGAd.ka', 13058785747, '(11) 95430-3067', NULL),
(2, 0, 'Usuário vendedor', '1914-05-28', 0, 1, '2025-05-08 19:35:16', 'vendedor@gmail.com', '$2y$10$M8aMT5YcqIUz5hVVIFDhNuzFmCR3KjvduRFFl/1dkBMr/U6cjheh6', NULL, '1238091823123', NULL),
(3, 0, 'Usuário administrador', '1914-05-28', 1, 1, '2025-05-08 19:35:29', 'admin@gmail.com', '$2y$10$CXEQjhtut2Ga46ZZQsxVtOxrQbh4Qr66.GLoiJYQDdmXvnauO02bq', NULL, '1238091823123', NULL),
(4, 0, 'Usuário vendedor 2', '1914-05-28', 0, 1, '2025-05-08 20:54:10', 'vendedor2@gmail.com', '$2y$10$JB6Ar5pXl11Pncdu60qCS.h3uFVXeJw6xzhVQ5Ta/gPBRRgtSIP6G', NULL, '1238091823123', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
