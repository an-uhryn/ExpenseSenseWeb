import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Router from './router'
import AuthManager from './authManager'
import NavigationBar from './components/NavigationBar'

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <NavigationBar />
      <AuthManager>
        <Router />
      </AuthManager>
    </BrowserRouter>
  )
}

export default App
