import { Button, Box, Typography } from '@mui/material'
import PageContainer from '../../common/components/PageContainer'
import GoogleIcon from '@mui/icons-material/Google'
import ExpenseSenseLogo from '../../images/ExpenseSense.png'
import React from 'react'

const Login = () => {
  const googleAuth = () => {
    window.open('http://localhost:4000/auth/google/callback', '_self')
  }
  return (
    <PageContainer>
      <Box style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 50 }}>
        <img src={ExpenseSenseLogo} width={200} height={200} alt="Logo" />
        <Typography variant="h4" padding={3}>
          ExpenseSense
        </Typography>
        <Typography variant="h6">Welcome to ExpenseSense app.</Typography>
        <Typography variant="h6">You can log in with your existing Google account.</Typography>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={googleAuth}
          style={{ marginTop: 30 }}
        >
          Sign in with google
        </Button>
      </Box>
    </PageContainer>
  )
}

export default Login
