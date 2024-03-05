import { ReactNode } from 'react'
import { useAppSelector } from '../redux/hooks'
import { selectUserIsAuthorized } from '../redux/user/selectors'
import Login from '../pages/login/Login'
import { Box } from '@mui/material'

interface Props {
  children: ReactNode
}

const AuthManager = ({ children }: Props) => {
  const isAuthorized = useAppSelector(selectUserIsAuthorized)

  return (
    <Box component="main" style={{ padding: 100 }}>
      {isAuthorized ? children : <Login />}
    </Box>
  )
}

export default AuthManager
