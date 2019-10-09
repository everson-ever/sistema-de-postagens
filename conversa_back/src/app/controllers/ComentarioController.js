const Comentario = require('../models/Comentario');

class ComentarioController {
	async index(req, res) {
		const { id } = req.params;

		let comentarios = await Comentario.select(id);
		return res.status(200).json(comentarios[0]);
	}

	async store(req, res) {
		const { comentario, idPost } = req.body;

		let inserted = await Comentario.insert(comentario, req.userId, idPost);

		if (inserted.affectedRows === 1) {
			req.io.emit('comentario', { comentario, Autor: req.nomeUsuario, idPost });
			return res.status(201).json({ status: true });
		}
		return res.status(500).json({ status: false, message: 'Internal Server Error' });
	}
}

module.exports = new ComentarioController();
