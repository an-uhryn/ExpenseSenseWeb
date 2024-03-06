import { Button, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import React from 'react'
import { logout } from '../../../api'
import { fetchUser } from '../../../redux/user/userSlice'
import { useAppDispatch } from '../../../redux/hooks'

const Authorized = () => {
  const dispatch = useAppDispatch()

  const logOut = () => {
    logout().then(() => {
      dispatch(fetchUser())
    })
  }
  return (
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
  )
}

export default Authorized
