const query = require('../../db/conection');

class Post {
	getAll(visivel) {
		let sql = `CALL spPostagensTodosUsuarios(${visivel})`;

		let postagens = query(sql);
		return postagens;
	}

	get(idPostagem) {
		let sql = `CALL spPostagemUsuario(${idPostagem})`;

		let postagem = query(sql);
		return postagem;
	}

	getPostagensUsuario(idUsuario, editando) {
		let sql = `CALL spPostagensUmUsuario(${idUsuario}, ${editando})`;

		let postagens = query(sql);

		return postagens;
	}

	insert(post) {
		let sql = `CALL spCadastrarPostagem('${post.titulo}','${post.conteudo}','${post.imagem}',1,${post.categoria},${post.idUsuario})`;

		let inserted = query(sql);
		return inserted;
	}

	delete(idPostagem) {
		let sql = `CALL spDeletarPostagem(${idPostagem});`;

		let deleted = query(sql);

		return deleted;
	}
}

module.exports = new Post();
