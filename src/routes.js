const express = require('express')

const routes = express.Router()

const Usuario = require('./controllers/usuarios.controller')
const Produtos = require('./controllers/produtos.controller')

routes.get('/', Usuario.index)

// Rotas de usuários
routes.post('/api/usuarios', Usuario.create)
routes.get('/api/usuarios', Usuario.index)
routes.get('/api/usuarios.details/:_id', Usuario.details)
routes.delete('/api/usuarios/:_id', Usuario.delete)
routes.put('/api/usuarios', Usuario.update)
routes.post('/api/usuarios/login', Usuario.login)
routes.get('/api/usuarios/checktoken', Usuario.checkToken)
routes.get('/api/usuarios/destroytoken', Usuario.destroyToken)

// Rotas de Produtos
routes.post('/api/produtos', Produtos.create)
routes.get('/api/produtos', Produtos.index)
routes.get('/api/produtos.details/:_id', Produtos.details)
routes.delete('/api/produtos/:_id', Produtos.delete)
routes.put('/api/produtos', Produtos.update)

module.exports = routes
