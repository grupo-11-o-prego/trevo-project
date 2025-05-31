-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 31/05/2025 às 18:43
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
  `anun_preco` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
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
(3, 'Livro Duna', 'Livro Duna, de Frank Herbert, editora Intrínseca', '2025-05-08 20:53:48', NULL, 'venda', 2, NULL, '70', 'DISPONÍVEL', 'NOVO'),
(4, 'Livro Duna', 'Livro Duna, de Frank Herbert, editora Intrínseca', '2025-05-08 20:53:54', NULL, 'venda', 2, NULL, '70', 'DISPONÍVEL', 'NOVO'),
(6, 'Biografia do Dudu', 'Biografia do Menino Eduardo completa!', '2025-05-08 21:12:56', NULL, 'venda', 2, NULL, '30', 'DISPONÍVEL', 'SEMINOVO');

-- --------------------------------------------------------

--
-- Estrutura para tabela `comentarios_tb`
--

DROP TABLE IF EXISTS `comentarios_tb`;
CREATE TABLE IF NOT EXISTS `comentarios_tb` (
  `com_id` int NOT NULL AUTO_INCREMENT,
  `com_user_id` int NOT NULL,
  `com_post_id` int NOT NULL,
  `com_data` datetime NOT NULL,
  `com_comentario` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `com_alterado` tinyint(1) NOT NULL,
  PRIMARY KEY (`com_id`),
  KEY `coment_user_id` (`com_user_id`),
  KEY `fk_com_post` (`com_post_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `comentarios_tb`
--

INSERT INTO `comentarios_tb` (`com_id`, `com_user_id`, `com_post_id`, `com_data`, `com_comentario`, `com_alterado`) VALUES
(1, 2, 1, '2025-05-28 22:22:38', 'Muito legal o post', 0);

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
  `den_for_id` int NOT NULL,
  `den_post_id` int NOT NULL,
  `den_com_id` int NOT NULL,
  `den_motivo` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `den_descricao` varchar(350) COLLATE utf8mb4_general_ci NOT NULL,
  `den_data` datetime NOT NULL,
  `den_revisao` tinyint(1) DEFAULT NULL,
  `preco_onibus` float NOT NULL,
  PRIMARY KEY (`den_id`),
  KEY `den_adm_user_id` (`den_adm_user_id`),
  KEY `den_user_id` (`den_user_id`),
  KEY `den_anun_id` (`den_anun_id`),
  KEY `fk_denuncias_forum_id` (`den_for_id`),
  KEY `fk_denuncias_post_id` (`den_post_id`),
  KEY `fk_denuncias_coment_id` (`den_com_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `denuncias_tb`
--

INSERT INTO `denuncias_tb` (`den_id`, `den_adm_user_id`, `den_user_id`, `den_anun_id`, `den_for_id`, `den_post_id`, `den_com_id`, `den_motivo`, `den_descricao`, `den_data`, `den_revisao`, `preco_onibus`) VALUES
(1, NULL, NULL, 4, 0, 0, 0, 'Abuso Verbal', 'Muito ódio', '2025-05-24 14:48:44', 1, 0),
(2, NULL, 2, NULL, 0, 0, 0, 'Abuso Verbal', 'Nanana', '2025-05-27 21:12:26', NULL, 3),
(3, NULL, 2, NULL, 0, 0, 0, 'Discurso de Odio', 'Odeia onibus', '2025-05-27 21:14:21', NULL, 30),
(4, NULL, 2, NULL, 0, 0, 0, 'Conteudo Abusivo', 'abusou onibus', '2025-05-27 21:21:01', NULL, 20);

-- --------------------------------------------------------

--
-- Estrutura para tabela `forum_tb`
--

DROP TABLE IF EXISTS `forum_tb`;
CREATE TABLE IF NOT EXISTS `forum_tb` (
  `for_id` int NOT NULL AUTO_INCREMENT,
  `for_titulo` varchar(350) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `for_descricao` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `for_tema` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `for_criador_user_id` int NOT NULL,
  PRIMARY KEY (`for_id`),
  KEY `fk_forum_criador_user` (`for_criador_user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `forum_tb`
--

INSERT INTO `forum_tb` (`for_id`, `for_titulo`, `for_descricao`, `for_tema`, `for_criador_user_id`) VALUES
(1, 'Fãs de Star Wars', 'Fórum para fãs de Star Wars', 'Star Wars', 1),
(2, 'Fãs de Duna', 'Fórum para fãs de Duna (obviamente)', 'Duna', 4),
(3, 'Fórum Geral', 'Para todos os gêneros literários', 'Geral', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `forum_usuario_tb`
--

DROP TABLE IF EXISTS `forum_usuario_tb`;
CREATE TABLE IF NOT EXISTS `forum_usuario_tb` (
  `foruser_id` int NOT NULL AUTO_INCREMENT,
  `foruser_for_id` int NOT NULL,
  `foruser_user_id` int NOT NULL,
  `foruser_data` datetime NOT NULL,
  PRIMARY KEY (`foruser_id`),
  KEY `fk_foruser_user` (`foruser_user_id`),
  KEY `fk_foruser_forum` (`foruser_for_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `forum_usuario_tb`
--

INSERT INTO `forum_usuario_tb` (`foruser_id`, `foruser_for_id`, `foruser_user_id`, `foruser_data`) VALUES
(1, 1, 1, '2025-05-25 21:05:39'),
(2, 1, 2, '2025-05-26 20:20:29'),
(3, 2, 1, '2025-05-27 19:49:12');

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
-- Estrutura para tabela `posts_tb`
--

DROP TABLE IF EXISTS `posts_tb`;
CREATE TABLE IF NOT EXISTS `posts_tb` (
  `pos_id` int NOT NULL AUTO_INCREMENT,
  `pos_user_id` int NOT NULL,
  `pos_data` datetime NOT NULL,
  `pos_texto` text NOT NULL,
  `pos_for_id` int NOT NULL,
  `pos_editado` tinyint(1) NOT NULL,
  PRIMARY KEY (`pos_id`),
  KEY `fk_post_user` (`pos_user_id`),
  KEY `fk_post_forum` (`pos_for_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `posts_tb`
--

INSERT INTO `posts_tb` (`pos_id`, `pos_user_id`, `pos_data`, `pos_texto`, `pos_for_id`, `pos_editado`) VALUES
(1, 2, '2025-05-26 21:44:28', 'Primeiro post editado em um fórum no Trevo! Show de bola', 1, 1),
(2, 1, '2025-05-28 20:15:35', 'Post top demais', 1, 0),
(4, 2, '2025-05-28 21:01:37', 'Post top demais', 2, 0);

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios_tb`
--

INSERT INTO `usuarios_tb` (`user_id`, `user_ativo`, `user_nome`, `user_data_nasc`, `user_moderador`, `user_vendedor`, `user_data`, `user_email`, `user_senha`, `user_cpf`, `user_contato`, `user_img_id`) VALUES
(1, 1, 'Usuário Leitor', '2005-12-21', 0, 0, '2025-05-08 19:35:03', 'leitor@gmail.com', '$2y$10$v50kLLxhEhRbeE9eTqCQ4eEzsS15nLQa2EeP2XBusbF7d6TyDDhVK', 54488473822, '(11) 95430-3067', NULL),
(2, 1, 'Usuário vendedor', '1914-05-28', 0, 1, '2025-05-08 19:35:16', 'vendedor@gmail.com', '$2y$10$M8aMT5YcqIUz5hVVIFDhNuzFmCR3KjvduRFFl/1dkBMr/U6cjheh6', NULL, '1238091823123', NULL),
(3, 1, 'Usuário administrador', '1914-05-28', 1, 1, '2025-05-08 19:35:29', 'admin@gmail.com', '$2y$10$CXEQjhtut2Ga46ZZQsxVtOxrQbh4Qr66.GLoiJYQDdmXvnauO02bq', NULL, '1238091823123', NULL),
(4, 1, 'Usuário vendedor 2', '1914-05-28', 0, 1, '2025-05-08 20:54:10', 'vendedor2@gmail.com', '$2y$10$JB6Ar5pXl11Pncdu60qCS.h3uFVXeJw6xzhVQ5Ta/gPBRRgtSIP6G', NULL, '1238091823123', NULL),
(5, 0, 'Usuário mal', '1914-05-28', 0, 0, '2025-05-31 15:34:22', 'mal@gmail.com', '$2y$10$LxOGK4CcUWgHVUX3QQVoNurVVwGnwM.wx4otpJaEYLrQRVDLbrLFa', NULL, '11954303067', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
