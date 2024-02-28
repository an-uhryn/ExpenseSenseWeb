import { ReactNode } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { selectUserIsAuthorized } from '../../redux/user/selectors'
import Login from '../components/Login'

interface Props {
  children: ReactNode
}

const AuthManager = ({ children }: Props) => {
  const isAuthorized = useAppSelector(selectUserIsAuthorized)

  return <>{isAuthorized ? children : <Login />}</>
}

export default AuthManager
