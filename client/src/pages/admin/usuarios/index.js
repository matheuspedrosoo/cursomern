import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import MenuAdmin from '../../../components/menu-admin.js'
import Footer from '../../../components/footer-admin'

import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import api from '../../../services/api.js'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import AddIcon from '@material-ui/icons/Add'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import ClearIcon from '@material-ui/icons/Clear'

import Chip from '@material-ui/core/Chip'
import {
  getNomeTipo,
  getNomeTipoLabel,
} from '../../../functions/static_data.js'
import { LinearProgress } from '@material-ui/core'

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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}))

export default function UsuariosListagem() {
  const classes = useStyles()

  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUsuarios() {
      const response = await api.get('/api/usuarios')
      setUsuarios(response.data)
      setLoading(false)
    }
    loadUsuarios()
  }, [])

  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      var result = await api.delete('/api/usuarios/' + id)
      if (result.status === 200) {
        window.location.href = '/admin/usuarios'
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente.')
      }
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Usuários'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button
                variant='contained'
                color='primary'
                href={'/admin/usuarios/cadastrar'}
                style={{ marginBottom: 10 }}
              >
                {' '}
                <AddIcon />
                Cadastrar{' '}
              </Button>
              <Paper className={classes.paper}>
                <h2>Listagem de Usuários</h2>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      {loading ? (
                        <LinearProgress
                          style={{ width: '50%', margin: '20 20 auto' }}
                        />
                      ) : (
                        <Table
                          className={classes.table}
                          size='small'
                          aria-label='a dense table'
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome </TableCell>
                              <TableCell align='center'>Email</TableCell>
                              <TableCell align='center'>Tipo</TableCell>
                              <TableCell align='center'>
                                Data de Cadastro
                              </TableCell>
                              <TableCell align='right'>Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {usuarios.map((row) => (
                              <TableRow key={row._id}>
                                <TableCell
                                  align='left'
                                  component='th'
                                  scope='row'
                                >
                                  {row.nome_usuario}
                                </TableCell>
                                <TableCell align='center'>
                                  {row.email_usuario}
                                </TableCell>
                                <TableCell align='center'>
                                  <Chip
                                    label={getNomeTipo(row.tipo_usuario)}
                                    color={getNomeTipoLabel(row.tipo_usuario)}
                                  />
                                </TableCell>
                                <TableCell align='center'>
                                  {new Date(row.createdAt).toLocaleString(
                                    'pt-br',
                                  )}
                                </TableCell>
                                <TableCell align='right'>
                                  <ButtonGroup
                                    variant='contained'
                                    aria-label='outlined primary button group'
                                  >
                                    <Button
                                      color='primary'
                                      href={'/admin/usuarios/editar/' + row._id}
                                    >
                                      <AutorenewIcon />
                                      Atualizar
                                    </Button>
                                    <Button
                                      color='secondary'
                                      onClick={() => handleDelete(row._id)}
                                    >
                                      <ClearIcon />
                                    </Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </TableContainer>
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
