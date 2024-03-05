import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

interface Props {
  path: string
  name: string
}

const NavigationMenuItem = ({ path, name }: Props) => {
  return (
    <NavLink to={path}>
      <Button style={{ color: '#fff' }}>{name}</Button>
    </NavLink>
  )
}

export default NavigationMenuItem
