import { Button, Box, Typography } from '@mui/material'
import PageContainer from '../../components/PageContainer'
import GoogleIcon from '@mui/icons-material/Google'
import LogoutIcon from '@mui/icons-material/Logout'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectUserIsAuthorized } from '../../redux/user/selectors'
import { logout } from '../../api'
import { fetchUser } from '../../redux/user/userSlice'

const Login = () => {
  const dispatch = useAppDispatch()
  const isAuthorized = useAppSelector(selectUserIsAuthorized)

  const googleAuth = () => {
    window.open('http://localhost:4000/auth/google/callback', '_self')
  }

  const logOut = () => {
    logout().then(() => {
      dispatch(fetchUser())
    })
  }

  return (
    <PageContainer>
      <Box style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: 50 }}>
        <img src="/images/ExpenseSense.png" width={200} height={200} alt="Logo" />
        <Typography variant="h4" padding={3}>
          ExpenseSense
        </Typography>
        <Typography variant="h6">Welcome to ExpenseSense app.</Typography>
        {isAuthorized ? (
          <>
            <Typography variant="h6">You are already authorized with Google account.</Typography>
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={logOut}
              style={{ marginTop: 30 }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">You can log in with your existing Google account.</Typography>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={googleAuth}
              style={{ marginTop: 30 }}
            >
              Sign in with google
            </Button>
          </>
        )}
      </Box>
    </PageContainer>
  )
}

export default Login
