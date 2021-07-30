import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import MenuAdmin from '../../../components/menu-admin.js'
import Footer from '../../../components/footer-admin'

import { getTipoUsuario } from '../../../services/auth'
import DashFuncionario from './funcionario'
import DashGerente from './gerente'
import DashAdmin from './admin'

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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}))

function getDashboard() {
  if (getTipoUsuario() === '1') {
    return <DashAdmin />
  } else if (getTipoUsuario() === '2') {
    return <DashGerente />
  } else {
    return <DashFuncionario />
  }
}

export default function Dashboard() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Dashboard'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={3}>
            {getDashboard()}
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  )
}
