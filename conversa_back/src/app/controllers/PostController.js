const Post = require('../models/Post');
const HttpStatus = require('../models/HttpStatus');

class PostController {
	async index(req, res) {
		let postagens = await Post.getAll(1);

		return res.status(HttpStatus.ok).json(postagens[0]);
	}

	async get(req, res) {
		const { id } = req.params;

		const postagem = await Post.get(id, 0);

		if (postagem[0].length === 1) {
			const { visivel, idUsuario: idUsuarioPostagem } = postagem[0][0];
			if (visivel === 1) {
				return res.status(HttpStatus.ok).json(postagem[0][0]);
			} else if (req.userId === idUsuarioPostagem) {
				return res.status(HttpStatus.ok).json(postagem[0][0]);
			} else {
				return res.status(HttpStatus.notFound).json({ status: false, message: 'Not Found' });
			}
		} else {
			return res.status(HttpStatus.notFound).json({ status: false, message: 'Not Found' });
		}
	}

	async getPostagensUsuario(req, res) {
		const { editando } = req.query;
		let postagens = await Post.getPostagensUsuario(req.userId, editando);

		if (postagens[0]) {
			return res.status(HttpStatus.ok).json(postagens[0]);
		}
	}

	async store(req, res) {
		const { titulo, conteudo, imagem, categoria } = req.body;

		const uniqueIdentify = new Date().getTime();

		const post = { titulo, conteudo, imagem, uniqueIdentify, categoria, idUsuario: req.userId };

		let inserted = await Post.insert(post);

		if (inserted.affectedRows === 1) {
			let post = await Post.get(0, uniqueIdentify);
			post = post[0][0];
			req.io.emit('postagem', { post });
			return res.status(HttpStatus.created).json({ status: true });
		}
		return res.status(HttpStatus.internalServerError).json({ status: false, message: 'Internal Server Error' });
	}

	async update(req, res) {
		const { idPostagem, titulo, conteudo, imagem, categoria, visivel } = req.body;
		const post = { idPostagem, titulo, conteudo, imagem, categoria, visivel, idUsuario: req.userId };

		let postagem = await Post.get(idPostagem);
		if (postagem[0].length === 0) {
			return res.status(404).json({ status: false, message: 'Not Found' });
		}

		const { idUsuario: idUsuarioPostagem } = postagem[0][0];

		if (req.userId === idUsuarioPostagem) {
			let updated = await Post.update(post);

			if (updated.affectedRows === 1) {
				req.io.emit('postagem', { post });
				return res.status(201).json({ status: true });
			}
			return res.status(500).json({ status: false, message: 'Internal Server Error' });
		}

		return res.status(401).json({ status: false, message: 'Unauthorized' });
	}

	async destroy(req, res) {
		const { id: idPostagem } = req.params;

		let postagem = await Post.get(idPostagem, 0);

		if (postagem[0].length === 1) {
			const { idUsuario } = postagem[0][0];

			if (idUsuario === req.userId) {
				let deleted = await Post.delete(idPostagem);
				if (deleted.affectedRows === 1) {
					return res.status(HttpStatus.ok).json({ status: true });
				}
				return res
					.status(HttpStatus.internalServerError)
					.json({ status: false, message: 'Internal Server Error' });
			} else {
				return res.status(HttpStatus.notFound).json({ status: false, message: 'Not Found' });
			}
		} else {
			return res.status(HttpStatus.notFound).json({ status: false, message: 'Not Found' });
		}
	}
}

module.exports = new PostController();
