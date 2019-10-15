const express = require('express');
const authMiddleware = require('./app/middlewares/auth');

const routes = express.Router();

const SessionController = require('./app/controllers/SessionController');
const UsuarioController = require('./app/controllers/UsuarioController');
const PostController = require('./app/controllers/PostController');
const ComentarioController = require('./app/controllers/ComentarioController');

routes.post('/session', SessionController.session);

routes.post('/cadastro', UsuarioController.store);
routes.get('/usuarios', authMiddleware, UsuarioController.index);

routes.get('/postagens', authMiddleware, PostController.index);
routes.get('/postagens/:id', authMiddleware, PostController.get);
routes.post('/postagens', authMiddleware, PostController.store);
routes.get('/minhas-postagens', authMiddleware, PostController.getPostagensUsuario);
routes.delete('/postagens/:id', authMiddleware, PostController.destroy);
routes.put('/postagens/:id', authMiddleware, PostController.update)

routes.get('/comentarios/:id', authMiddleware, ComentarioController.index);
routes.post('/postagens/comentar', authMiddleware, ComentarioController.store);

module.exports = routes;
