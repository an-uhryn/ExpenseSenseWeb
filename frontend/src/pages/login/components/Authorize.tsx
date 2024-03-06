import { Button, Typography } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import React from 'react'

const Authorize = () => {
  const googleAuth = () => {
    window.open('http://localhost:4000/auth/google/callback', '_self')
  }

  return (
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
  )
}

export default Authorize
