import { Box } from '@mui/material'
import NavbarItem from './NavbarItem'
import { useAppSelector } from '../../redux/hooks'
import { selectUserIsAuthorized } from '../../redux/user/selectors'

const Navbar = () => {
  const isAuthorized = useAppSelector(selectUserIsAuthorized)

  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      {isAuthorized && (
        <>
          <NavbarItem path="/" name="Dashboard" />
          <NavbarItem path="/categories" name="Categories" />
          <NavbarItem path="/tags" name="Tags" />
          <NavbarItem path="/expenses" name="Expenses" />
        </>
      )}
    </Box>
  )
}

export default Navbar
