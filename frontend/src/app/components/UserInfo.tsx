import AccountCircle from '@mui/icons-material/AccountCircle'
import { IconButton, Typography, Avatar } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectUser, selectUserIsAuthorized } from '../../redux/user/selectors'
import LogoutIcon from '@mui/icons-material/Logout'
import { logout } from '../../api'
import { fetchUser } from '../../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const UserInfo = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const isAuthorized = useAppSelector(selectUserIsAuthorized)
  const navigate = useNavigate()

  const redirectToProfile = () => {
    navigate('/profile')
  }

  return (
    <>
      {isAuthorized && (
        <>
          <Typography style={{ marginLeft: 80 }}>{user.displayName}</Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={redirectToProfile}
            color="inherit"
          >
            {user.photos.length ? (
              <Avatar alt={user.displayName} src={user.photos[0].value} />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => {
              logout().then(() => {
                dispatch(fetchUser())
              })
            }}
            color="inherit"
            title="Logout"
          >
            <LogoutIcon />
          </IconButton>
        </>
      )}
    </>
  )
}

export default UserInfo
