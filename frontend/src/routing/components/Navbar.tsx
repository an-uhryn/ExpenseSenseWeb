import {Link, NavLink} from "react-router-dom"
import {Stack, Button} from "@mui/material";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Stack direction="row" spacing={2}>
          <NavLink
            to='/'
            className={({ isActive, isPending }) => isActive ? "active" : ""}
          >
            <Button>Dashboard</Button>
          </NavLink>
          <NavLink
            to='/categories'
            className={({ isActive, isPending }) => isActive ? "active" : ""}
          >
            <Button>Categories</Button>
          </NavLink>
          <NavLink
            to='/tags'
            className={({ isActive, isPending }) => isActive ? "active" : ""}
          >
            <Button>Tags</Button>
          </NavLink>
          <NavLink
            to='/expenses'
            className={({ isActive, isPending }) => isActive ? "active" : ""}
          >
            <Button>Expenses</Button>
          </NavLink>
        </Stack>
      </nav>
    </header>
  )
}

export default Navbar
