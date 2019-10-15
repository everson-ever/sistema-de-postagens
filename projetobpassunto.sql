-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 12-Out-2019 às 01:47
-- Versão do servidor: 10.1.40-MariaDB
-- versão do PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projetobpassunto`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `spCadastrarComentario` (`comentarioCadastrar` TEXT, `idUsuario` INT, `idPostagem` INT)  BEGIN

	INSERT INTO TbComentario(comentario, idUsuario, idPostagem) VALUES
	(comentarioCadastrar, idUsuario, idPostagem);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spCadastrarPostagem` (`titulo` VARCHAR(100), `conteudo` TEXT, `imagem` VARCHAR(255), `visivel` TINYINT, `idCategoria` TINYINT, `idUsuario` INT)  BEGIN

	INSERT INTO TbPostagem(titulo, conteudo, imagem, visivel, idCategoria, idUsuario)
	VALUES(titulo, conteudo, imagem, visivel, idCategoria, idUsuario);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spCadastrarUsuario` (`nome` VARCHAR(80), `email` VARCHAR(80), `dataNascimento` DATE, `senha` VARCHAR(255), `idSexo` TINYINT, `idEndereco` SMALLINT)  BEGIN
	INSERT INTO TbUsuario(nome, email, dataNascimento, senha, idSexo, idEndereco ) VALUES
	(nome, email, dataNascimento, senha, idSexo, idEndereco);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spDeletarPostagem` (`id` INT)  BEGIN
	DELETE FROM TbPostagem WHERE idPostagem = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spEditarPostagem` (IN `id` INT, IN `titulo` VARCHAR(255), IN `conteudo` TEXT, IN `visivel` TINYINT, IN `idCategoria` INT, IN `imagem` VARCHAR(255))  BEGIN
        UPDATE tbpostagem
        SET titulo = titulo,conteudo = conteudo, visivel = visivel, idCategoria = idCategoria
        WHERE idPostagem = id;
        
        UPDATE tbImagem
        SET imagem = imagem
        WHERE idPostagem = id;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spImagensPostagem` (`idPostagem` INT, `qtd` INT)  BEGIN
	SELECT im.idImagem, im.imagem FROM TbPostagem pos
	INNER JOIN TbImagem im ON pos.idPostagem = im.idPostagem
	WHERE pos.idPostagem = im.idPostagem LIMIT qtd;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spPostagemComentario` (`idPostagem` INT)  BEGIN

	SELECT com.comentario, us.nome Autor FROM TbPostagem pos
	INNER JOIN TbComentario com ON pos.idPostagem = com.idPostagem
	INNER JOIN TbUsuario us ON com.idUsuario = us.idUsuario
	WHERE pos.IdPostagem = idPostagem
	ORDER BY com.idComentario;
	
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spPostagemUsuario` (`idPostagem` INT)  BEGIN

	SELECT pos.idPostagem, pos.titulo, pos.conteudo,pos.imagem, cat.nomeCategoria categoria, us.nome autor,us.idUsuario, pos.visivel FROM TbPostagem pos
	INNER JOIN TbUsuario us ON pos.idUsuario = us.idUsuario
	INNER JOIN TbCategoria cat  ON pos.idCategoria = cat.idCategoria
	WHERE pos.idPostagem = idPostagem;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spPostagensTodosUsuarios` (`statusVisivel` TINYINT)  BEGIN 


	SELECT pos.idPostagem,pos.visivel, pos.titulo, pos.conteudo,POS.imagem, cat.nomeCategoria categoria, us.nome autor FROM TbPostagem pos
	INNER JOIN TbUsuario us ON pos.idUsuario = us.idUsuario
	INNER JOIN TbCategoria cat  ON pos.idCategoria = cat.idCategoria
	WHERE pos.visivel = statusVisivel
	ORDER BY pos.idPostagem DESC;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spPostagensUmUsuario` (`idUsuario` INT, `statusVisivel` TINYINT)  BEGIN

SELECT pos.idPostagem, pos.titulo, pos.conteudo,pos.imagem, cat.nomeCategoria categoria, us.nome autor FROM TbPostagem pos
	INNER JOIN TbUsuario us ON pos.idUsuario = us.idUsuario
	INNER JOIN TbCategoria cat  ON pos.idCategoria = cat.idCategoria
	WHERE pos.visivel = statusVisivel AND us.idUsuario = idUsuario;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spPostsPopulares` ()  BEGIN
	SELECT 	pos.idPostagem, pos.titulo, COUNT(com.idComentario) comentarios FROM TbPostagem pos
	INNER JOIN TbComentario com ON pos.idPostagem = com.idPostagem
	WHERE pos.visivel = 1
	GROUP BY pos.titulo
	ORDER BY comentarios DESC LIMIT 5;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spVerificarLoginUsuario` (`email` VARCHAR(100), `senha` VARCHAR(1000))  BEGIN  
   SELECT * FROM TbUsuario u WHERE u.email = email AND u.senha = senha ;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `fnVerificarLoginUsuario` (`email` VARCHAR(100), `senha` VARCHAR(100)) RETURNS VARCHAR(8000) CHARSET latin1 BEGIN

RETURN (
	SELECT * FROM TbUsuario u WHERE u.email = email AND u.senha = senha
);


END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbcategoria`
--

CREATE TABLE `tbcategoria` (
  `idCategoria` int(11) NOT NULL,
  `nomeCategoria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbcategoria`
--

INSERT INTO `tbcategoria` (`idCategoria`, `nomeCategoria`) VALUES
(1, 'Tecnologia da Informação'),
(2, 'Política'),
(3, 'Natureza'),
(4, 'Moda');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbcomentario`
--

CREATE TABLE `tbcomentario` (
  `idComentario` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `idPostagem` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbcomentario`
--

INSERT INTO `tbcomentario` (`idComentario`, `comentario`, `idPostagem`, `idUsuario`) VALUES
(61, 'haha', 75, 34),
(62, 'Eai', 75, 1),
(63, 'q isso meu', 75, 34),
(64, 'q isso meu', 75, 34),
(65, 'Meu carro', 76, 1),
(66, 'daqui ha uns 50 anos', 76, 34);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbendereco`
--

CREATE TABLE `tbendereco` (
  `idEndereco` int(11) NOT NULL,
  `nomeCidade` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbendereco`
--

INSERT INTO `tbendereco` (`idEndereco`, `nomeCidade`) VALUES
(1, 'São josé de mipibu'),
(2, 'Natal'),
(3, 'Goianinha');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbpostagem`
--

CREATE TABLE `tbpostagem` (
  `idPostagem` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `conteudo` text,
  `visivel` tinyint(1) DEFAULT '1',
  `idCategoria` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `imagem` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbpostagem`
--

INSERT INTO `tbpostagem` (`idPostagem`, `titulo`, `conteudo`, `visivel`, `idCategoria`, `idUsuario`, `imagem`) VALUES
(71, 'aa', 'aaaaaaaaaa', 2, 2, 17, 'https://s3.amazonaws.com/bk-static-prd-newctn/files/styles/full_image_block_experience_960x539/s3/2018-03/Chile_Corralco_Abre.jpg?itok=9lK1ITBa'),
(74, 'oo', 'oo', 1, 1, 17, 'https://www.praiamarnatal.com.br/resourcefiles/blogsmallimages/cajueiro-de-pirangi-hotel-em-natal.jpg'),
(75, 'oo', 'oo', 1, 1, 1, 'https://cdn-cv.r4you.co/wp-content/uploads/2015/11/12248789_955134864553541_1601827287_n.jpg'),
(76, 'oo', 'oo', 1, 1, 34, 'https://abrilquatrorodas.files.wordpress.com/2018/11/p90331098_highres_bmw-vision-inext-11-e1543429340433.jpg?quality=70&strip=info&strip=info');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbsexo`
--

CREATE TABLE `tbsexo` (
  `idSexo` tinyint(4) NOT NULL,
  `sexo` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbsexo`
--

INSERT INTO `tbsexo` (`idSexo`, `sexo`) VALUES
(1, 'M'),
(2, 'F');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbusuario`
--

CREATE TABLE `tbusuario` (
  `idUsuario` int(11) NOT NULL,
  `nome` varchar(80) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `dataNascimento` date DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `idSexo` tinyint(4) DEFAULT NULL,
  `idEndereco` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbusuario`
--

INSERT INTO `tbusuario` (`idUsuario`, `nome`, `email`, `dataNascimento`, `senha`, `admin`, `idSexo`, `idEndereco`) VALUES
(1, 'Admin', 'everson@gmail.com', '1997-09-08', '159753', 1, 1, 1),
(16, 'Alcides José da Silva', 'alcides@gmail.com', '1962-07-04', 'alcides021051', 0, 1, 3),
(17, 'Maria de Lourdes Barbosa', 'lourdes@gmail.com', '1972-07-01', 'marialourdes', 0, 2, 2),
(33, 'Kemilly Pedra', 'kemilly@gmail.com', '2019-03-13', '333333', 0, 2, 1),
(34, 'emanuel pereira', 'emanuel@hotmail.com', '1959-08-06', '123456', 0, 1, 2);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vwdadosusuarios`
-- (See below for the actual view)
--
CREATE TABLE `vwdadosusuarios` (
`nome` varchar(80)
,`email` varchar(80)
,`dataNascimento` date
,`nomeCidade` varchar(100)
,`sexo` char(1)
);

-- --------------------------------------------------------

--
-- Structure for view `vwdadosusuarios`
--
DROP TABLE IF EXISTS `vwdadosusuarios`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vwdadosusuarios`  AS  select `us`.`nome` AS `nome`,`us`.`email` AS `email`,`us`.`dataNascimento` AS `dataNascimento`,`ende`.`nomeCidade` AS `nomeCidade`,`sx`.`sexo` AS `sexo` from ((`tbusuario` `us` join `tbendereco` `ende` on((`us`.`idEndereco` = `ende`.`idEndereco`))) join `tbsexo` `sx` on((`us`.`idSexo` = `sx`.`idSexo`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbcategoria`
--
ALTER TABLE `tbcategoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indexes for table `tbcomentario`
--
ALTER TABLE `tbcomentario`
  ADD PRIMARY KEY (`idComentario`),
  ADD KEY `idPostagem` (`idPostagem`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `tbendereco`
--
ALTER TABLE `tbendereco`
  ADD PRIMARY KEY (`idEndereco`);

--
-- Indexes for table `tbpostagem`
--
ALTER TABLE `tbpostagem`
  ADD PRIMARY KEY (`idPostagem`),
  ADD KEY `idCategoria` (`idCategoria`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `tbsexo`
--
ALTER TABLE `tbsexo`
  ADD PRIMARY KEY (`idSexo`);

--
-- Indexes for table `tbusuario`
--
ALTER TABLE `tbusuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `idSexo` (`idSexo`),
  ADD KEY `idEndereco` (`idEndereco`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbcategoria`
--
ALTER TABLE `tbcategoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbcomentario`
--
ALTER TABLE `tbcomentario`
  MODIFY `idComentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `tbendereco`
--
ALTER TABLE `tbendereco`
  MODIFY `idEndereco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbpostagem`
--
ALTER TABLE `tbpostagem`
  MODIFY `idPostagem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `tbsexo`
--
ALTER TABLE `tbsexo`
  MODIFY `idSexo` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbusuario`
--
ALTER TABLE `tbusuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `tbcomentario`
--
ALTER TABLE `tbcomentario`
  ADD CONSTRAINT `tbcomentario_ibfk_1` FOREIGN KEY (`idPostagem`) REFERENCES `tbpostagem` (`idPostagem`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbcomentario_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `tbusuario` (`idUsuario`);

--
-- Limitadores para a tabela `tbpostagem`
--
ALTER TABLE `tbpostagem`
  ADD CONSTRAINT `tbpostagem_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `tbcategoria` (`idCategoria`),
  ADD CONSTRAINT `tbpostagem_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `tbusuario` (`idUsuario`);

--
-- Limitadores para a tabela `tbusuario`
--
ALTER TABLE `tbusuario`
  ADD CONSTRAINT `tbusuario_ibfk_1` FOREIGN KEY (`idSexo`) REFERENCES `tbsexo` (`idSexo`),
  ADD CONSTRAINT `tbusuario_ibfk_2` FOREIGN KEY (`idEndereco`) REFERENCES `tbendereco` (`idEndereco`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
