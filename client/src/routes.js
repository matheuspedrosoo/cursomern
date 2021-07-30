import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard from './pages/admin/dashboard'

// Imports ADMIN
import Produtos from './pages/admin/produtos'
import ProdutoEditar from './pages/admin/produtos/produtos.editar'
import ProdutoCadastrar from './pages/admin/produtos/produtos.cadastrar'

import Usuarios from './pages/admin/usuarios'
import UsuariosEditar from './pages/admin/usuarios/usuario.editar'
import UsuariosCadastrar from './pages/admin/usuarios/usuario.cadastrar'

// Imports Client
import Home from './pages/client/home'
import ProdutoDetails from './pages/client/produtos/produtos.details'
import Login from './pages/admin/login'

import PrivateRoute from './services/wAuth'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Rota Cliente */}
        <Route path='/' exact component={Home} />
        <Route path='/produtos/:idProduto' exact component={ProdutoDetails} />

        {/* Rota Admin */}
        <Route path='/admin/login' exact component={Login} />
        <PrivateRoute path='/admin' exact component={Dashboard} />
        

        <PrivateRoute path='/admin/produtos' exact component={Produtos} />
        <PrivateRoute
          path='/admin/produtos/cadastrar'
          exact
          component={ProdutoCadastrar}
        />
        <PrivateRoute
          path='/admin/produtos/editar/:idProduto'
          exact
          component={ProdutoEditar}
        />

        <PrivateRoute path='/admin/usuarios' exact component={Usuarios} />
        <PrivateRoute
          path='/admin/usuarios/cadastrar'
          exact
          component={UsuariosCadastrar}
        />
        <PrivateRoute
          path='/admin/usuarios/editar/:idUsuario'
          exact
          component={UsuariosEditar}
        />
      </Switch>
    </BrowserRouter>
  )
}
