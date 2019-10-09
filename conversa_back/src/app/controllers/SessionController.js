const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

class SessionController {
	async session(req, res) {
		const { senha, email } = req.body;

		let usuario = await Usuario.get(email, senha);

		if (usuario[0].length === 1) {
			const { idUsuario, nome, admin } = usuario[0][0];

			let token = jwt.sign({ idUsuario, nome, admin }, 'projetoweb2', { expiresIn: 86400 });

			return res.status(200).json({ status: true, token });
		} else {
			let message = 'User Not Found';
			return res.json({ status: false, message });
		}
	}
}

module.exports = new SessionController();
