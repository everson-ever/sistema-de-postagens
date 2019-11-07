const query = require('../../db/conection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class Usuario {
	constructor() {
		//this.connection = connection;
	}

	get(infoPesquisa) {
		let sql = `CALL spVerificarLoginUsuario('${infoPesquisa}')`;

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
        '${usuario.dataNascimento}', '${usuario.criptografada}', ${usuario.idSexo}, ${usuario.idEndereco});`;

		connection.query(sql, callback);
	}

	update() {}

	generateToken(data) {
		let token = jwt.sign({ idUsuario: data.idUsuario, nome: data.nome, admin: data.admin }, 'projetoweb2', {
			expiresIn: 86400
		});

		return token;
	}

	async criptografaSenha(senha) {
		if (senha) {
			let senhaCriptografada = await bcrypt.hash(senha, 8);
			return senhaCriptografada;
		}
	}

	async checaPassword(senhaCadastrada, senhaComparar) {
		return bcrypt.compare(senhaComparar, senhaCadastrada);
	}
}

module.exports = new Usuario();
