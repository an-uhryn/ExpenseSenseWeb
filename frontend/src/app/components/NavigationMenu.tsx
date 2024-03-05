import { Box } from '@mui/material'
import NavigationMenuItem from './NavigationMenuItem'
import { useAppSelector } from '../../redux/hooks'
import { selectUserIsAuthorized } from '../../redux/user/selectors'

const NavigationMenu = () => {
  const isAuthorized = useAppSelector(selectUserIsAuthorized)

  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      {isAuthorized && (
        <>
          <NavigationMenuItem path="/" name="Dashboard" />
          <NavigationMenuItem path="/categories" name="Categories" />
          <NavigationMenuItem path="/tags" name="Tags" />
          <NavigationMenuItem path="/expenses" name="Expenses" />
          <NavigationMenuItem path="/groups" name="Groups" />
        </>
      )}
    </Box>
  )
}

export default NavigationMenu
