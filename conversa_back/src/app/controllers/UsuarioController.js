const Usuario = require('../models/Usuario');

class UsuarioController {
	index(req, res) {
		if (req.admin == 0) {
			return res.status(401).json({ status: false, message: 'Unauthorized' });
		}

		try {
			Usuario.getAll((error, result) => {
				return res.send(result);
			});
		} catch (error) {
			return res.status(500).json({ status: false, message: 'Internal Server Error' });
		}
	}

	async store(req, res) {
		const { nome, email, dataNascimento, senha, idSexo, idEndereco } = req.body;
		const usuario = { nome, email, dataNascimento, senha, idSexo, idEndereco };

		Usuario.store(usuario, (error, result) => {
			if (result) {
				if (result.affectedRows == 1) {
					return res.status(201).json({ status: true, message: 'Created' });
				}
			}

			if (error) {
				return res.status(400).json({ status: false, message: 'Bad Request' });
			}
		});
	}
}

module.exports = new UsuarioController();
