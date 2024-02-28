import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './routing/components/Navbar'
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material'
import Router from './routing/router'
import ExpenseSenseLogo from './images/ExpenseSense.png'
import UserInfo from './auth/components/UserInfo'
import AuthManager from './auth/hoc/AuthManager'

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <img src={ExpenseSenseLogo} width={36} height={36} alt="Logo" />
          </Typography>
          <Navbar />
          <UserInfo />
        </Toolbar>
      </AppBar>
      <Box component="main" style={{ padding: 100 }}>
        <AuthManager>
          <Router />
        </AuthManager>
      </Box>
    </BrowserRouter>
  )
}

export default App
