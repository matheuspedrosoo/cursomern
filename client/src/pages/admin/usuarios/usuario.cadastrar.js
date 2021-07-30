import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import MenuAdmin from '../../../components/menu-admin'
import Footer from '../../../components/footer-admin'

import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SaveIcon from '@material-ui/icons/Save'

import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    width: '100%',
  },
  btnSuccess: {
    backgroundColor: 'green',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#12b912',
    },
  },
}))

export default function UsuarioCadastrar() {
  const classes = useStyles()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState('')

  async function handleSubmit() {
    const data = {
      nome_usuario: nome,
      email_usuario: email,
      senha_usuario: senha,
      tipo_usuario: tipo,
    }

    if (nome !== '' && email !== '' && senha !== '' && tipo !== '') {
      const response = await api.post('/api/usuarios', data)

      if (response.status === 200) {
        window.location.href = '/admin/usuarios'
      } else {
        alert('Erro ao cadastrar o usuário')
      }
    } else {
      alert('Preencha todos os dados!')
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Usuários'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Button
                variant='contained'
                href={'/admin/usuarios'}
                style={{ marginBottom: 10, marginRight: 5 }}
              >
                {' '}
                <ArrowBackIcon />
                Voltar{' '}
              </Button>
              <Paper className={classes.paper}>
                <h2>Cadastro de Usuários</h2>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      autoComplete='nome'
                      name='nome'
                      required
                      fullWidth
                      id='nome'
                      label='Nome completo'
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete='email'
                      name='email'
                      required
                      fullWidth
                      id='email'
                      label='Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id='labelTipo'>Tipo</InputLabel>
                      <Select
                        labelId='labelTipo'
                        id='tipo'
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Gerente</MenuItem>
                        <MenuItem value={3}>Funcionário</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      type='password'
                      autoComplete='senha'
                      name='senha'
                      required
                      fullWidth
                      id='senha'
                      label='Senha'
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button
                      variant='contained'
                      onClick={handleSubmit}
                      className={classes.btnSuccess}
                    >
                      <SaveIcon />
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  )
}
