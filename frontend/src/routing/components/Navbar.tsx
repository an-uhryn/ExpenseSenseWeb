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
            <Button href="#text-buttons">Dashboard</Button>
          </NavLink>
          <NavLink
            to='/categories'
            className={({ isActive, isPending }) => isActive ? "active" : ""}
          >
            <Button href="#text-buttons">Categories</Button>
          </NavLink>
        </Stack>
      </nav>
    </header>
  )
}

export default Navbar
