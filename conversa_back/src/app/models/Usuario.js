const query = require('../../db/conection');

class Usuario {
	constructor() {
		//this.connection = connection;
	}

	get(email, senha) {
		let sql = `CALL spVerificarLoginUsuario('${email}', '${senha}')`;

		let usuario = query(sql);
		return usuario;
	}

	getAll(callback) {
		let sql = `SELECT * FROM vwDadosUsuarios`;

		connection.query(sql, callback);
	}

	delete(id, callback) {
		let sql = `DELETE FROM TbUsuario WHERE idUsuario = ${id}`;

		connection.query(sql, callback);
	}

	store(usuario, callback) {
		let sql = `CALL spCadastrarUsuario('${usuario.nome}' ,'${usuario.email}',
        '${usuario.dataNascimento}', '${usuario.senha}', ${usuario.idSexo}, ${usuario.idEndereco});`;

		connection.query(sql, callback);
	}

	update() {}
}

module.exports = new Usuario();
