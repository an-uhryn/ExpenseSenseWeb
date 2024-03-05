import {AppBar, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import NavigationMenu from "./NavigationMenu";
import UserInfo from "./UserInfo";
import React from "react";

const NavigationBar = () => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          <NavLink to="/">
            <img src="images/ExpenseSense.png" width={36} height={36} alt="ExpenseSense logo" />
          </NavLink>
        </Typography>
        <NavigationMenu />
        <UserInfo />
      </Toolbar>
    </AppBar>
  )
}

export default NavigationBar