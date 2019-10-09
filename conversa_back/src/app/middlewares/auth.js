const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ error: 'Token Not Provided' });
	}

	const [ , token ] = authHeader.split(' ');

	try {
		const decoded = await promisify(jwt.verify)(token, 'projetoweb2');

		const { idUsuario, nome, admin } = decoded;

		req.userId = idUsuario;
		req.nomeUsuario = nome;
		req.admin = admin;

		return next();
	} catch (error) {
		return res.status(401).json({ error: 'Token Invalid' });
	}
};
