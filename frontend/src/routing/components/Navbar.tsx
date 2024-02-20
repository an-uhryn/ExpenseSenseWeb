import { NavLink } from 'react-router-dom'
import { Button, Box } from '@mui/material'
import NavbarItem from './NavbarItem'

const Navbar = () => {
  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      <NavbarItem path="/" name="Dashboard" />
      <NavbarItem path="/categories" name="Categories" />
      <NavbarItem path="/tags" name="Tags" />
      <NavbarItem path="/expenses" name="Expenses" />
    </Box>
  )
}

export default Navbar
