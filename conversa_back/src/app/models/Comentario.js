const query = require('../../db/conection');

class Comentario {
	select(id) {
		let sql = `CALL spPostagemComentario(${id})`;

		let comentarios = query(sql);

		return comentarios;
	}

	insert(comentario, idUsuario, idPostagem) {
		let sql = `CALL spCadastrarComentario('${comentario}', ${idUsuario}, ${idPostagem})`;

		let inserted = query(sql);

		return inserted;
	}
}

module.exports = new Comentario();
